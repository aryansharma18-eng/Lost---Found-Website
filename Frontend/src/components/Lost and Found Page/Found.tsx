import React, { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  HeartHandshake,
  ImagePlus,
  Loader2,
  MapPin,
  Phone,
  Upload,
  User,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./ReportForm.css";

interface FoundFormData {
  name: string;
  itemName: string;
  description: string;
  foundLocation: string;
  foundDate: string;
  contactNumber: string;
  itemImage: File | null;
}

const initialFormData: FoundFormData = {
  name: "",
  itemName: "",
  description: "",
  foundLocation: "",
  foundDate: "",
  contactNumber: "",
  itemImage: null,
};

const Found = () => {
  const [formData, setFormData] =
    useState<FoundFormData>(initialFormData);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [successMessage, setSuccessMessage] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [id]: value,
    }));

    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] || null;

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage("Image size must be less than 10MB.");
      return;
    }

    setFormData((previous) => ({
      ...previous,
      itemImage: file,
    }));

    setSuccessMessage("");
    setErrorMessage("");
  };

  const removeImage = () => {
    setFormData((previous) => ({
      ...previous,
      itemImage: null,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    let imageUrl = "";

    try {
      /*
       * Step 1:
       * Upload image to Cloudinary.
       */
      if (formData.itemImage) {
        const cloudinaryUrl =
          import.meta.env.VITE_CLOUDINARY_UPLOAD_URL;

        const imageData = new FormData();

        imageData.append(
          "file",
          formData.itemImage
        );

        imageData.append(
          "upload_preset",
          import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
        );

        imageData.append(
          "folder",
          "Found_Items"
        );

        const cloudinaryResponse = await fetch(
          cloudinaryUrl,
          {
            method: "POST",
            body: imageData,
          }
        );

        if (!cloudinaryResponse.ok) {
          throw new Error("Image upload failed.");
        }

        const cloudinaryData =
          await cloudinaryResponse.json();

        imageUrl =
          cloudinaryData.secure_url || "";

        if (!imageUrl) {
          throw new Error(
            "Unable to get uploaded image URL."
          );
        }
      }

      /*
       * Step 2:
       * Submit report to the existing backend.
       *
       * The backend currently expects `finderId`,
       * so keep that API field while using
       * a generic name field in the new UI.
       */
      const submissionData = {
        finderId: formData.name,
        itemName: formData.itemName,
        description: formData.description,
        foundLocation: formData.foundLocation,
        foundDate: formData.foundDate,
        contactNumber: formData.contactNumber,
        itemImage: imageUrl || null,
      };

      const response = await fetch(
         `${import.meta.env.VITE_API_URL}/foundReport`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "Unable to submit your found item."
        );
      }

      setSuccessMessage(
        "Your found item has been reported successfully."
      );

      setFormData(initialFormData);
    } catch (error) {
      console.error(
        "Found item submission failed:",
        error
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while submitting the report."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="report-page">
      <div className="container report-container">

        {/* Back link */}
        <Link to="/" className="report-back-link">
          <ArrowLeft size={17} />
          Back to Home
        </Link>


        {/* Page Header */}
        <div className="report-header">
          <div className="report-header-icon found-icon">
            <HeartHandshake size={25} />
          </div>

          <div>
            <span className="report-eyebrow found-eyebrow">
              FOUND ITEM
            </span>

            <h1>
              Report something you found
            </h1>

            <p>
              Share the details of an item you've found and help
              reconnect it with its owner.
            </p>
          </div>
        </div>


        {/* Form */}
        <form
          className="report-form"
          onSubmit={handleSubmit}
        >

          {/* Personal Information */}
          <section className="form-section">

            <div className="form-section-heading">
              <div className="section-heading-number">
                01
              </div>

              <div>
                <h2>
                  Your information
                </h2>

                <p>
                  Tell us how someone can contact you.
                </p>
              </div>
            </div>


            <div className="form-grid">

              <div className="form-field">
                <label htmlFor="name">
                  Your Name
                  <span>*</span>
                </label>

                <div className="input-wrapper">
                  <User size={18} />

                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>


              <div className="form-field">
                <label htmlFor="contactNumber">
                  Contact Number
                  <span>*</span>
                </label>

                <div className="input-wrapper">
                  <Phone size={18} />

                  <input
                    id="contactNumber"
                    type="tel"
                    placeholder="Enter your contact number"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

            </div>
          </section>


          {/* Item Information */}
          <section className="form-section">

            <div className="form-section-heading">
              <div className="section-heading-number">
                02
              </div>

              <div>
                <h2>
                  Item details
                </h2>

                <p>
                  Give us enough information to identify the item.
                </p>
              </div>
            </div>


            <div className="form-field">
              <label htmlFor="itemName">
                Item Name
                <span>*</span>
              </label>

              <input
                id="itemName"
                type="text"
                placeholder="For example: Black wallet, AirPods, backpack..."
                value={formData.itemName}
                onChange={handleChange}
                required
              />
            </div>


            <div className="form-field">
              <label htmlFor="description">
                Description
                <span>*</span>
              </label>

              <textarea
                id="description"
                rows={5}
                placeholder="Describe the item using details such as colour, brand, size, unique marks, contents, etc."
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

          </section>


          {/* Location & Date */}
          <section className="form-section">

            <div className="form-section-heading">
              <div className="section-heading-number">
                03
              </div>

              <div>
                <h2>
                  When & where
                </h2>

                <p>
                  Let people know where and when the item was found.
                </p>
              </div>
            </div>


            <div className="form-grid">

              <div className="form-field">
                <label htmlFor="foundLocation">
                  Found Location
                  <span>*</span>
                </label>

                <div className="input-wrapper">
                  <MapPin size={18} />

                  <input
                    id="foundLocation"
                    type="text"
                    placeholder="Where did you find it?"
                    value={formData.foundLocation}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>


              <div className="form-field">
                <label htmlFor="foundDate">
                  Found Date & Time
                  <span>*</span>
                </label>

                <input
                  id="foundDate"
                  type="datetime-local"
                  value={formData.foundDate}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

          </section>


          {/* Image */}
          <section className="form-section">

            <div className="form-section-heading">
              <div className="section-heading-number">
                04
              </div>

              <div>
                <h2>
                  Add a photo
                </h2>

                <p>
                  Upload a photo so the owner can recognise their item.
                </p>
              </div>
            </div>


            {!formData.itemImage ? (
              <label
                htmlFor="found-image-upload"
                className="image-upload-area"
              >
                <div className="upload-icon">
                  <ImagePlus size={27} />
                </div>

                <div className="upload-content">
                  <strong>
                    Upload an item photo
                  </strong>

                  <span>
                    Click to browse from your device
                  </span>

                  <small>
                    PNG, JPG or GIF · Maximum 10MB
                  </small>
                </div>

                <Upload
                  size={20}
                  className="upload-arrow"
                />

                <input
                  id="found-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
              </label>
            ) : (
              <div className="selected-file">
                <div className="selected-file-icon">
                  <ImagePlus size={21} />
                </div>

                <div className="selected-file-info">
                  <strong>
                    {formData.itemImage.name}
                  </strong>

                  <span>
                    {(
                      formData.itemImage.size /
                      (1024 * 1024)
                    ).toFixed(2)}{" "}
                    MB
                  </span>
                </div>

                <button
                  type="button"
                  className="remove-file-button"
                  onClick={removeImage}
                  aria-label="Remove selected image"
                >
                  <X size={18} />
                </button>
              </div>
            )}

          </section>


          {/* Messages */}
          {successMessage && (
            <div className="form-message success-message">
              <CheckCircle2 size={20} />

              <span>
                {successMessage}
              </span>
            </div>
          )}


          {errorMessage && (
            <div className="form-message error-message">
              <X size={20} />

              <span>
                {errorMessage}
              </span>
            </div>
          )}


          {/* Submit */}
          <div className="form-submit-area">

            <p>
              By submitting this report, you confirm that the
              information provided is accurate.
            </p>

            <button
              type="submit"
              className="report-submit-button found-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2
                    size={19}
                    className="loading-icon"
                  />

                  Submitting...
                </>
              ) : (
                <>
                  <HeartHandshake size={19} />

                  Submit Found Item
                </>
              )}
            </button>

          </div>

        </form>
      </div>
    </main>
  );
};

export default Found;