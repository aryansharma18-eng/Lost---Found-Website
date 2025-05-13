import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
  finderId: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  foundLocation:{
    type: String,
    required: true,
  },
  foundDate:{
    type: Date,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  proofImage: {
    url: {
      type: String,

    },
    publicId: {
      type: String,
      required: function() {
        return this.reportType === 'found';
      }
    }
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

export default mongoose.model('Found', ReportSchema);