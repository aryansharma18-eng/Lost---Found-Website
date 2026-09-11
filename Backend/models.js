import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
      trim: true,
    },

    itemName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    lastSeenLocation: {
      type: String,
      required: true,
      trim: true,
    },

    lastSeen: {
      type: Date,
      required: true,
    },

    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },

    proofImage: {
      url: {
        type: String,
        trim: true,
        default: "",
      },

      publicId: {
        type: String,
        trim: true,
        default: "",
      },
    },

    status: {
      type: String,
      enum: ["active", "resolved", "expired"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Report", ReportSchema);