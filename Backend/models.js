import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  lastSeen: {
    type: Date,
    required: true
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true
  },
  proofImage: {
    url: {
      type: String,
      required: function() {
        // Image is required only for 'found' reports
        return this.reportType === 'found';
      }
    },
    publicId: {
      type: String,
      required: function() {
        return this.reportType === 'found';
      }
    }
  },
  status: {
    type: String,
    enum: ['active', 'resolved', 'expired'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
ReportSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Report', ReportSchema);