// const Report = require('../models/Report');
import Report from './models.js';
import Found from './models2.js';
import { cloudinary } from './cloudinary.js';

// Create a new report (lost or found)

export const foundReport = async (req, res) => {
  try {
    console.log(req.body);
    const { finderId, itemName, description, foundLocation,foundDate, contactNumber } = req.body;
    // finderId: '',
    // itemName: '',
    // description: '',
    // foundLocation: '',
    // foundDate: '',
    // contactNumber: '',
    // itemImage: null
    const reportData = {
      finderId,
      itemName,
      description,
      contactNumber,
      foundLocation,
      foundDate,
    };

    // Add image data if a file was uploaded
    if (req.file) {
      reportData.proofImage = {
        url: req.file.path,
        publicId: req.file.filename
      };
    }

    // Create new report
    const report = await Found.create(reportData);

    res.status(201).json({
      success: true,
      data: report
    });
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

export const createReport = async (req, res) => {
  try {
    console.log(req.body);
    const { studentId, itemName, description, lastSeen, contactNumber } = req.body;
    
    const reportData = {
      studentId,
      itemName,
      description,
      lastSeen: new Date(lastSeen),
      contactNumber
    };

    // Add image data if a file was uploaded
    if (req.file) {
      reportData.proofImage = {
        url: req.file.path,
        publicId: req.file.filename
      };
    }

    // Create new report
    const report = await Report.create(reportData);

    res.status(201).json({
      success: true,
      data: report
    });
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get all reports
export const getAllReports = async (req, res) => {
  try {
    // You can add filters here based on query parameters
    const filter = {};
    
    if (req.query.reportType) {
      filter.reportType = req.query.reportType;
    }
    
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const reports = await Report.find(filter).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get a single report by ID
export const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: report
    });
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update report status
export const updateReportStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['active', 'resolved', 'expired'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }
    
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: report
    });
  } catch (error) {
    console.error('Error updating report:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete a report
export const deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }
    
    // Delete image from Cloudinary if it exists
    if (report.proofImage && report.proofImage.publicId) {
      await cloudinary.uploader.destroy(report.proofImage.publicId);
    }
    
    await report.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Report deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting report:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};