const isNonEmptyString = (value) => {
  return typeof value === "string" && value.trim().length > 0;
};

const validatePhoneNumber = (value) => {
  if (!isNonEmptyString(value)) {
    return false;
  }

  const phone = value.trim();

  return /^[0-9+\-\s()]{7,20}$/.test(phone);
};

const validateReport = (req, res, next) => {
  const {
    studentId,
    finderId,
    itemName,
    description,
    lastSeen,
    lastSeenLocation,
    foundLocation,
    foundDate,
    contactNumber,
    proofImage,
    itemImage,
  } = req.body;

  const isLostReport = Boolean(studentId);
  const isFoundReport = Boolean(finderId);

  // BASIC COMMON VALIDATION

  if (!isNonEmptyString(itemName)) {
    return res.status(400).json({
      success: false,
      message: "Item name is required.",
    });
  }

  if (!isNonEmptyString(description)) {
    return res.status(400).json({
      success: false,
      message: "Description is required.",
    });
  }

  if (!validatePhoneNumber(contactNumber)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid contact number.",
    });
  }

  // LOST REPORT

  if (isLostReport) {
    if (!isNonEmptyString(studentId)) {
      return res.status(400).json({
        success: false,
        message: "Student ID is required.",
      });
    }

    if (!isNonEmptyString(lastSeenLocation)) {
      return res.status(400).json({
        success: false,
        message: "Last seen location is required.",
      });
    }

    if (!lastSeen || Number.isNaN(Date.parse(lastSeen))) {
      return res.status(400).json({
        success: false,
        message: "A valid last-seen date is required.",
      });
    }

    if (proofImage && typeof proofImage !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid proof image.",
      });
    }

    return next();
  }

  // FOUND REPORT

  if (isFoundReport) {
    if (!isNonEmptyString(finderId)) {
      return res.status(400).json({
        success: false,
        message: "Finder ID is required.",
      });
    }

    if (!isNonEmptyString(foundLocation)) {
      return res.status(400).json({
        success: false,
        message: "Found location is required.",
      });
    }

    if (!foundDate || Number.isNaN(Date.parse(foundDate))) {
      return res.status(400).json({
        success: false,
        message: "A valid found date is required.",
      });
    }

    const image = proofImage || itemImage;

    if (image && typeof image !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid item image.",
      });
    }

    return next();
  }

  // INVALID REPORT TYPE

  return res.status(400).json({
    success: false,
    message: "Invalid report data.",
  });
};

export default validateReport;