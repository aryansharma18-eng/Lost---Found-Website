import mongoose from "mongoose";

const FoundSchema = new mongoose.Schema(
  {
    finderId: {
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

    foundLocation: {
      type: String,
      required: true,
      trim: true,
    },

    foundDate: {
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Found", FoundSchema);