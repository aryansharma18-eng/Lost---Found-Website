import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  CalendarDays,
  PackageSearch,
  Loader2,
  AlertCircle,
  RefreshCw,
  ArrowRight,
  X,
} from "lucide-react";
import "./Browse.css";

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

type FilterType = "all" | "lost" | "found";

const API_URL = `${import.meta.env.VITE_API_URL}/browse`;

function Browse() {
  const [reports, setReports] = useState<Report[]>([]);
  const [filter, setFilter] =
    useState<FilterType>("all");

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // FETCH REPORTS

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      params.append("type", filter);

      if (search.trim()) {
        params.append(
          "search",
          search.trim()
        );
      }

      const response = await fetch(
        `${API_URL}?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch reports."
        );
      }

      const data: Report[] =
        await response.json();

      setReports(data);

    } catch (err) {
      console.error(
        "Error fetching reports:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while loading reports."
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchReports();
  }, [filter, search]);


  // SEARCH

  const handleSearch = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setSearch(searchInput);
  };


  // CLEAR SEARCH

  const handleClearSearch = () => {
    setSearchInput("");
    setSearch("");
  };


  // FORMAT DATE

  const formatDate = (
    dateValue: string
  ) => {
    if (!dateValue) {
      return "Not available";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return dateValue;
    }

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };


  // RENDER

  return (
    <main className="browse-page">

      {/* HERO */}

      <section className="browse-hero">

        <div className="browse-hero-inner">

          <div className="browse-hero-text">

            <span className="browse-eyebrow">
              LOST & FOUND COMMUNITY
            </span>

            <h1>
              Find what you're
              <span> looking for.</span>
            </h1>

            <p>
              Browse reported lost and found items.
              Your next search could help reunite
              someone with what matters to them.
            </p>

          </div>


          {/* SEARCH BOX */}

          <form
            className="browse-search-box"
            onSubmit={handleSearch}
          >

            <div className="browse-search-field">

              <Search size={21} />

              <input
                type="text"
                value={searchInput}
                onChange={(event) =>
                  setSearchInput(
                    event.target.value
                  )
                }
                placeholder="Search by item, description or location..."
              />

              {/* CLEAR SEARCH BUTTON */}

              {searchInput && (
                <button
                  type="button"
                  className="browse-clear-search"
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                  title="Clear search"
                >
                  <X size={17} />
                </button>
              )}

            </div>

            <button
              type="submit"
              className="browse-search-button"
            >
              <Search size={18} />
              Search
            </button>

          </form>

        </div>

      </section>


      {/* MAIN CONTENT */}

      <section className="browse-content">

        <div className="browse-container">


          {/* FILTER BAR */}

          <div className="browse-toolbar">

            <div className="browse-filter-group">

              <button
                type="button"
                className={`browse-filter ${
                  filter === "all"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setFilter("all")
                }
              >
                All Reports
              </button>

              <button
                type="button"
                className={`browse-filter ${
                  filter === "lost"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setFilter("lost")
                }
              >
                Lost Items
              </button>

              <button
                type="button"
                className={`browse-filter ${
                  filter === "found"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setFilter("found")
                }
              >
                Found Items
              </button>

            </div>


            <button
              type="button"
              className="browse-refresh"
              onClick={fetchReports}
              disabled={loading}
            >
              <RefreshCw
                size={16}
                className={
                  loading
                    ? "browse-refresh-spin"
                    : ""
                }
              />

              Refresh
            </button>

          </div>


          {/* RESULTS HEADER */}

          {!loading && !error && (
            <div className="browse-results-heading">

              <div>
                <span className="browse-results-number">
                  {reports.length}
                </span>

                <span className="browse-results-text">
                  {reports.length === 1
                    ? " report found"
                    : " reports found"}
                </span>
              </div>

              {search && (
                <span className="browse-search-result">
                  Results for "{search}"
                </span>
              )}

            </div>
          )}


          {/* LOADING */}

          {loading && (
            <div className="browse-state">

              <Loader2
                size={40}
                className="browse-spinner"
              />

              <h2>
                Loading reports
              </h2>

              <p>
                We're getting the latest
                lost and found reports.
              </p>

            </div>
          )}


          {/* ERROR */}

          {!loading && error && (
            <div className="browse-state">

              <div className="browse-state-icon error">
                <AlertCircle size={32} />
              </div>

              <h2>
                Unable to load reports
              </h2>

              <p>
                {error}
              </p>

              <button
                type="button"
                className="browse-state-button"
                onClick={fetchReports}
              >
                <RefreshCw size={17} />
                Try Again
              </button>

            </div>
          )}


          {/* EMPTY */}

          {!loading &&
            !error &&
            reports.length === 0 && (
              <div className="browse-state">

                <div className="browse-state-icon">
                  <PackageSearch size={32} />
                </div>

                <h2>
                  No reports found
                </h2>

                <p>
                  We couldn't find anything
                  matching your search.
                  Try another keyword or
                  filter.
                </p>

              </div>
            )}


          {/* REPORT GRID */}

          {!loading &&
            !error &&
            reports.length > 0 && (

              <div className="browse-grid">

                {reports.map((report) => (

                  <Link
                    key={`${report.type}-${report._id}`}
                    to={`/browse/${report.type}/${report._id}`}
                    className="browse-card-link"
                  >

                    <article className="browse-card">


                      {/* IMAGE */}

                      <div className="browse-card-image">

                        {report.imageUrl ? (
                          <img
                            src={report.imageUrl}
                            alt={report.itemName}
                          />
                        ) : (
                          <div className="browse-no-image">

                            <PackageSearch
                              size={46}
                              strokeWidth={1.5}
                            />

                            <span>
                              No image available
                            </span>

                          </div>
                        )}


                        {/* TYPE */}

                        <span
                          className={`browse-type ${
                            report.type
                          }`}
                        >
                          {report.type === "lost"
                            ? "LOST"
                            : "FOUND"}
                        </span>


                        {/* STATUS */}

                        <span className="browse-status">
                          {report.status ||
                            "Active"}
                        </span>

                      </div>


                      {/* CONTENT */}

                      <div className="browse-card-body">

                        <div className="browse-card-heading">

                          <div>

                            <span className="browse-card-label">
                              {report.type ===
                              "lost"
                                ? "Lost Item"
                                : "Found Item"}
                            </span>

                            <h2>
                              {report.itemName}
                            </h2>

                          </div>

                          <span className="browse-arrow">
                            <ArrowRight
                              size={18}
                            />
                          </span>

                        </div>


                        {/* DESCRIPTION */}

                        <p className="browse-description">
                          {report.description ||
                            "No description provided."}
                        </p>


                        {/* DETAILS */}

                        <div className="browse-details">

                          <div className="browse-detail">

                            <MapPin size={16} />

                            <div>
                              <span>
                                Location
                              </span>

                              <strong>
                                {report.location ||
                                  "Not available"}
                              </strong>
                            </div>

                          </div>


                          <div className="browse-detail">

                            <CalendarDays
                              size={16}
                            />

                            <div>
                              <span>
                                Date
                              </span>

                              <strong>
                                {formatDate(
                                  report.date
                                )}
                              </strong>

                            </div>

                          </div>

                        </div>


                        {/* FOOTER */}

                        <div className="browse-card-footer">

                          <div>

                            <span>
                              {report.type ===
                              "lost"
                                ? "Reported by"
                                : "Found by"}
                            </span>

                            <strong>
                              {report.name ||
                                "Unknown"}
                            </strong>

                          </div>

                          <span className="browse-view">
                            View details
                            <ArrowRight
                              size={15}
                            />
                          </span>

                        </div>

                      </div>

                    </article>

                  </Link>

                ))}

              </div>

            )}

        </div>

      </section>

    </main>
  );
}

export default Browse;