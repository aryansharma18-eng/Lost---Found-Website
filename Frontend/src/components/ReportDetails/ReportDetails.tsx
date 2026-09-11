import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Loader2,
  MapPin,
  Package,
  Phone,
  User,
  AlertCircle,
} from "lucide-react";
import "./ReportDetails.css";

interface Report {
  _id: string;
  type: "lost" | "found";
  name: string;
  itemName: string;
  description: string;
  location: string;
  date: string;
  contactNumber: string;
  imageUrl?: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

const API_BASE_URL =  import.meta.env.VITE_API_URL;

function ReportDetails() {
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();

  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      if (!type || !id) {
        setError("Invalid report details.");
        setLoading(false);
        return;
      }

      if (type !== "lost" && type !== "found") {
        setError("Invalid report type.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_BASE_URL}/browse/${type}/${id}`
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);

          throw new Error(
            errorData?.message || "Unable to load report details."
          );
        }

        const data: Report = await response.json();

        setReport(data);
      } catch (err) {
        console.error("Error fetching report details:", err);

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong while loading the report.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [type, id]);

  const formatDate = (dateValue: string) => {
    if (!dateValue) {
      return "Not available";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return dateValue;
    }

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getReportTypeLabel = () => {
    return report?.type === "lost" ? "Lost Item" : "Found Item";
  };

  const getStatusLabel = () => {
    if (!report?.status) {
      return "Active";
    }

    return report.status.charAt(0).toUpperCase() + report.status.slice(1);
  };

  if (loading) {
    return (
      <section className="report-details-page">
        <div className="report-details-state">
          <Loader2 className="report-details-spinner" size={42} />
          <h2>Loading report...</h2>
          <p>Please wait while we fetch the report details.</p>
        </div>
      </section>
    );
  }

  if (error || !report) {
    return (
      <section className="report-details-page">
        <div className="report-details-state report-details-error">
          <div className="report-details-state-icon">
            <AlertCircle size={34} />
          </div>

          <h2>Report not found</h2>

          <p>
            {error || "We couldn't find the report you're looking for."}
          </p>

          <button
            type="button"
            className="report-details-back-button"
            onClick={() => navigate("/browse")}
          >
            <ArrowLeft size={18} />
            Back to Browse
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="report-details-page">
      <div className="report-details-container">

        {/* Back Button */}
        <Link to="/browse" className="report-details-back-link">
          <ArrowLeft size={18} />
          Back to Browse Reports
        </Link>

        {/* Main Details Card */}
        <div className="report-details-card">

          {/* Image Section */}
          <div className="report-details-image-section">
            {report.imageUrl ? (
              <img
                src={report.imageUrl}
                alt={report.itemName}
                className="report-details-image"
              />
            ) : (
              <div className="report-details-no-image">
                <Package size={64} strokeWidth={1.5} />
                <span>No image available</span>
              </div>
            )}

            <div
              className={`report-details-type-badge ${
                report.type === "lost"
                  ? "report-details-type-lost"
                  : "report-details-type-found"
              }`}
            >
              {getReportTypeLabel()}
            </div>
          </div>

          {/* Information Section */}
          <div className="report-details-content">

            <div className="report-details-heading">
              <div>
                <span className="report-details-small-label">
                  {report.type === "lost"
                    ? "Someone is looking for this item"
                    : "Someone has found this item"}
                </span>

                <h1>{report.itemName}</h1>
              </div>

              <span
                className={`report-details-status ${
                  report.status === "resolved"
                    ? "report-details-status-resolved"
                    : "report-details-status-active"
                }`}
              >
                {getStatusLabel()}
              </span>
            </div>

            {/* Description */}
            <div className="report-details-description">
              <h2>Description</h2>

              <p>
                {report.description || "No description provided."}
              </p>
            </div>

            {/* Information Grid */}
            <div className="report-details-info-grid">

              <div className="report-details-info-item">
                <div className="report-details-info-icon">
                  <MapPin size={20} />
                </div>

                <div>
                  <span>Location</span>
                  <strong>
                    {report.location || "Not available"}
                  </strong>
                </div>
              </div>

              <div className="report-details-info-item">
                <div className="report-details-info-icon">
                  <CalendarDays size={20} />
                </div>

                <div>
                  <span>
                    {report.type === "lost"
                      ? "Last Seen"
                      : "Found On"}
                  </span>

                  <strong>
                    {formatDate(report.date)}
                  </strong>
                </div>
              </div>

              <div className="report-details-info-item">
                <div className="report-details-info-icon">
                  <User size={20} />
                </div>

                <div>
                  <span>
                    {report.type === "lost"
                      ? "Reported By"
                      : "Found By"}
                  </span>

                  <strong>
                    {report.name || "Not available"}
                  </strong>
                </div>
              </div>

              <div className="report-details-info-item">
                <div className="report-details-info-icon">
                  <Phone size={20} />
                </div>

                <div>
                  <span>Contact Number</span>

                  <strong>
                    {report.contactNumber || "Not available"}
                  </strong>
                </div>
              </div>

            </div>

            {/* Contact Section */}
            <div className="report-details-contact-box">
              <div className="report-details-contact-icon">
                <Phone size={22} />
              </div>

              <div className="report-details-contact-text">
                <h3>
                  {report.type === "lost"
                    ? "Found this item?"
                    : "Is this your item?"}
                </h3>

                <p>
                  Get in touch with the person who reported this item.
                </p>
              </div>

              {report.contactNumber ? (
                <a
                  href={`tel:${report.contactNumber}`}
                  className="report-details-contact-button"
                >
                  <Phone size={18} />
                  Contact
                </a>
              ) : (
                <span className="report-details-no-contact">
                  No contact available
                </span>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default ReportDetails;