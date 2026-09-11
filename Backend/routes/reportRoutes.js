import express from "express";

import validateReport from "../middleware.js";

import {
  foundReport,
  createReport,
  getAllReports,
  getBrowseReports,
  getBrowseReportById,
  getReportById,
  updateReportStatus,
  deleteReport,
} from "../controllers.js";

const router = express.Router();

// CREATE REPORTS

// Found item
router.post(
  "/foundReport",
  validateReport,
  foundReport
);

// Lost item
router.post(
  "/report",
  validateReport,
  createReport
);

// BROWSE REPORTS

// Get all / filtered reports
router.get(
  "/browse",
  getBrowseReports
);

// Get one specific report
router.get(
  "/browse/:type/:id",
  getBrowseReportById
);

// EXISTING REPORT ENDPOINTS

// Get all lost reports
router.get(
  "/reports",
  getAllReports
);

// Get one lost report
router.get(
  "/report/:id",
  getReportById
);

// Update lost report status
router.patch(
  "/report/:id/status",
  updateReportStatus
);

// Delete lost report
router.delete(
  "/report/:id",
  deleteReport
);

export default router;