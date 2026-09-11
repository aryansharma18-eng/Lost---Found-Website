import mongoose from "mongoose";
import Report from "./models.js";
import Found from "./models2.js";

// IMAGE HELPER

const getImageUrl = (proofImage) => {
  if (!proofImage) {
    return "";
  }

  // Supports older records where proofImage may be a string
  if (typeof proofImage === "string") {
    return proofImage;
  }

  // Supports current schema where proofImage is an object
  if (typeof proofImage === "object") {
    return proofImage.url || "";
  }

  return "";
};


// NORMALIZE IMAGE DATA BEFORE SAVING

const normalizeProofImage = (image) => {
  if (!image) {
    return undefined;
  }

  // If frontend sends only Cloudinary URL
  if (typeof image === "string") {
    return {
      url: image,
      publicId: "",
    };
  }

  // If frontend sends object
  if (typeof image === "object") {
    return {
      url: image.url || "",
      publicId: image.publicId || "",
    };
  }

  return undefined;
};


// LOST ITEM REPORT

export const createReport = async (req, res) => {
  try {
    const {
      studentId,
      itemName,
      description,
      lastSeenLocation,
      lastSeen,
      contactNumber,
      proofImage,
    } = req.body;

    const normalizedImage = normalizeProofImage(proofImage);

    const report = new Report({
      studentId,
      itemName,
      description,
      lastSeenLocation,
      lastSeen,
      contactNumber,
      proofImage: normalizedImage,
    });

    const savedReport = await report.save();

    res.status(201).json({
      message: "Lost item report created successfully",
      report: savedReport,
    });
  } catch (error) {
    console.error("Error creating lost report:", error);

    res.status(500).json({
      message: "Failed to create lost item report",
      error: error.message,
    });
  }
};


// FOUND ITEM REPORT

export const foundReport = async (req, res) => {
  try {
    const {
      finderId,
      itemName,
      description,
      foundLocation,
      foundDate,
      contactNumber,
      proofImage,
      itemImage,
    } = req.body;

    /*
     * The current Found frontend sends `itemImage`.
     *
     * Older/current backend expects `proofImage`.
     *
     * We support both so nothing breaks.
     */
    const imageData = proofImage || itemImage;

    const normalizedImage = normalizeProofImage(imageData);

    const report = new Found({
      finderId,
      itemName,
      description,
      foundLocation,
      foundDate,
      contactNumber,
      proofImage: normalizedImage,
    });

    const savedReport = await report.save();

    res.status(201).json({
      message: "Found item report created successfully",
      report: savedReport,
    });
  } catch (error) {
    console.error("Error creating found report:", error);

    res.status(500).json({
      message: "Failed to create found item report",
      error: error.message,
    });
  }
};


// GET ALL LOST REPORTS

export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });

    res.status(200).json(reports);
  } catch (error) {
    console.error("Error fetching lost reports:", error);

    res.status(500).json({
      message: "Failed to fetch lost reports",
      error: error.message,
    });
  }
};


// SEARCH REGEX HELPER

const escapeRegex = (value) => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};


// BROWSE ALL REPORTS

export const getBrowseReports = async (req, res) => {
  try {
    const {
      type = "all",
      search = "",
      status = "",
    } = req.query;

    const searchText = String(search).trim();

    const searchRegex = searchText
      ? new RegExp(escapeRegex(searchText), "i")
      : null;

    let lostReports = [];
    let foundReports = [];


    // LOST REPORTS

    if (type === "all" || type === "lost") {
      const lostQuery = {};

      if (searchRegex) {
        lostQuery.$or = [
          { studentId: searchRegex },
          { itemName: searchRegex },
          { description: searchRegex },
        ];
      }

      if (status) {
        lostQuery.status = status;
      }

      const reports = await Report.find(lostQuery)
        .sort({ createdAt: -1 })
        .lean();

      lostReports = reports.map((report) => ({
        _id: report._id,
        type: "lost",
        name: report.studentId,
        itemName: report.itemName,
        description: report.description,
        location: report.lastSeenLocation,
        date: report.lastSeen,
        contactNumber: report.contactNumber,

        // FIXED IMAGE URL
        imageUrl: getImageUrl(report.proofImage),

        status: report.status,
        createdAt: report.createdAt,
        updatedAt: report.updatedAt,
      }));
    }


    // FOUND REPORTS

    if (type === "all" || type === "found") {
      const foundQuery = {};

      if (searchRegex) {
        foundQuery.$or = [
          { finderId: searchRegex },
          { itemName: searchRegex },
          { description: searchRegex },
          { foundLocation: searchRegex },
        ];
      }

      const reports = await Found.find(foundQuery)
        .sort({ createdAt: -1 })
        .lean();

      foundReports = reports.map((report) => ({
        _id: report._id,
        type: "found",
        name: report.finderId,
        itemName: report.itemName,
        description: report.description,
        location: report.foundLocation,
        date: report.foundDate,
        contactNumber: report.contactNumber,

        // FIXED IMAGE URL
        imageUrl: getImageUrl(report.proofImage),

        status: "active",
        createdAt: report.createdAt,
        updatedAt: report.updatedAt,
      }));
    }


    // COMBINE + SORT

    const combinedReports = [
      ...lostReports,
      ...foundReports,
    ];

    combinedReports.sort((a, b) => {
      return (
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
      );
    });


    res.status(200).json(combinedReports);

  } catch (error) {
    console.error(
      "Error fetching browse reports:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch browse reports",
      error: error.message,
    });
  }
};


// GET ONE REPORT FOR BROWSE DETAILS

export const getBrowseReportById = async (req, res) => {
  try {
    const { type, id } = req.params;


    // Validate report type

    if (type !== "lost" && type !== "found") {
      return res.status(400).json({
        message:
          "Invalid report type. Use 'lost' or 'found'.",
      });
    }


    // Validate MongoDB ObjectId

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid report ID.",
      });
    }


    // LOST REPORT

    if (type === "lost") {
      const report = await Report.findById(id).lean();

      if (!report) {
        return res.status(404).json({
          message: "Lost report not found.",
        });
      }

      return res.status(200).json({
        _id: report._id,
        type: "lost",
        name: report.studentId,
        itemName: report.itemName,
        description: report.description,
        location: report.lastSeenLocation,
        date: report.lastSeen,
        contactNumber: report.contactNumber,

        // FIXED IMAGE URL
        imageUrl: getImageUrl(report.proofImage),

        status: report.status,
        createdAt: report.createdAt,
        updatedAt: report.updatedAt,
      });
    }


    // FOUND REPORT

    const report = await Found.findById(id).lean();

    if (!report) {
      return res.status(404).json({
        message: "Found report not found.",
      });
    }

    return res.status(200).json({
      _id: report._id,
      type: "found",
      name: report.finderId,
      itemName: report.itemName,
      description: report.description,
      location: report.foundLocation,
      date: report.foundDate,
      contactNumber: report.contactNumber,

      // FIXED IMAGE URL
      imageUrl: getImageUrl(report.proofImage),

      status: "active",
      createdAt: report.createdAt,
      updatedAt: report.updatedAt,
    });

  } catch (error) {
    console.error(
      "Error fetching report details:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch report details",
      error: error.message,
    });
  }
};


// GET LOST REPORT BY ID

export const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    res.status(200).json(report);
  } catch (error) {
    console.error(
      "Error fetching report:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch report",
      error: error.message,
    });
  }
};


// UPDATE LOST REPORT STATUS

export const updateReportStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    res.status(200).json({
      message: "Report status updated successfully",
      report,
    });
  } catch (error) {
    console.error(
      "Error updating report status:",
      error
    );

    res.status(500).json({
      message: "Failed to update report status",
      error: error.message,
    });
  }
};


// DELETE LOST REPORT

export const deleteReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(
      req.params.id
    );

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    res.status(200).json({
      message: "Report deleted successfully",
    });
  } catch (error) {
    console.error(
      "Error deleting report:",
      error
    );

    res.status(500).json({
      message: "Failed to delete report",
      error: error.message,
    });
  }
};