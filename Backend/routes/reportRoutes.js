import express from 'express';
const router = express.Router();
import { upload }  from '../cloudinary.js';
import validateReport  from '../middleware.js';
import {
  foundReport,
  createReport,
  getAllReports,
  getReportById,
  updateReportStatus,
  deleteReport
} from '../controllers.js';

// POST - Create a new report

router.post('/foundReport', upload.single('proofImage'), foundReport);
router.post('/report', upload.single('proofImage'), validateReport, createReport);

// GET - Get all reports (can filter by type or status using query parameters)
router.get('/reports', getAllReports);

// GET - Get a single report by ID
router.get('/report/:id', getReportById);

// PATCH - Update report status
router.patch('/report/:id/status', updateReportStatus);

// DELETE - Delete a report
router.delete('/report/:id', deleteReport);

export default router;