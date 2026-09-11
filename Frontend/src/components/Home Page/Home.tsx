import { Link } from "react-router-dom";
import {
  ArrowRight,
  Search,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  PackageSearch,
  HeartHandshake,
} from "lucide-react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-page">

      {/* HERO SECTION */}

      <section className="hero-section">
        <div className="container hero-container">

          <div className="hero-content">

            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              A simpler way to find what matters
            </div>

            <h1 className="hero-title">
              Lost something?
              <br />
              <span>Let's find it.</span>
            </h1>

            <p className="hero-description">
              Report lost belongings, share found items, and help reunite
              people with the things that matter to them.
            </p>

            <div className="hero-actions">
              <Link to="/lost" className="primary-button">
                Report Lost Item
                <ArrowRight size={18} />
              </Link>

              <Link to="/found" className="secondary-button">
                Report Found Item
              </Link>
            </div>

            <div className="hero-trust">
              <div className="trust-item">
                <ShieldCheck size={17} />
                <span>Simple & secure</span>
              </div>

              <div className="trust-item">
                <MapPin size={17} />
                <span>Location based</span>
              </div>
            </div>
          </div>


          {/* Hero Visual */}
          <div className="hero-visual">

            <div className="hero-card hero-card-main">

              <div className="hero-card-top">
                <div className="hero-card-icon">
                  <PackageSearch size={23} />
                </div>

                <span className="hero-card-status">
                  Active
                </span>
              </div>

              <div className="hero-card-content">
                <span className="hero-card-label">
                  Looking for
                </span>

                <h3>
                  Lost belongings
                </h3>

                <p>
                  Find and reconnect with items through the community.
                </p>
              </div>

              <div className="hero-card-location">
                <MapPin size={16} />
                <span>Search by location</span>
              </div>
            </div>


            <div className="floating-card floating-card-one">
              <div className="floating-icon">
                <Search size={18} />
              </div>

              <div>
                <strong>Search</strong>
                <span>Find an item</span>
              </div>
            </div>


            <div className="floating-card floating-card-two">
              <div className="floating-icon success">
                <CheckCircle2 size={18} />
              </div>

              <div>
                <strong>Reunited</strong>
                <span>One less thing lost</span>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ACTION CARDS */}

      <section className="action-section">
        <div className="container">

          <div className="section-heading">
            <span className="section-eyebrow">
              GET STARTED
            </span>

            <h2>
              What brings you here?
            </h2>

            <p>
              Choose an option and take the first step toward finding or
              returning an item.
            </p>
          </div>


          <div className="action-grid">

            <Link to="/lost" className="action-card lost-card">
              <div className="action-card-icon">
                <Search size={25} />
              </div>

              <div className="action-card-content">
                <span className="action-card-label">
                  I lost something
                </span>

                <h3>
                  Report a Lost Item
                </h3>

                <p>
                  Tell us what you lost, where you last saw it, and provide
                  the details that can help identify it.
                </p>
              </div>

              <div className="action-card-arrow">
                <ArrowRight size={20} />
              </div>
            </Link>


            <Link to="/found" className="action-card found-card">
              <div className="action-card-icon">
                <HeartHandshake size={25} />
              </div>

              <div className="action-card-content">
                <span className="action-card-label">
                  I found something
                </span>

                <h3>
                  Report a Found Item
                </h3>

                <p>
                  Share details about something you've found and help get it
                  back to its rightful owner.
                </p>
              </div>

              <div className="action-card-arrow">
                <ArrowRight size={20} />
              </div>
            </Link>

          </div>
        </div>
      </section>


      {/* HOW IT WORKS */}

      <section className="process-section">
        <div className="container">

          <div className="section-heading centered">
            <span className="section-eyebrow">
              HOW IT WORKS
            </span>

            <h2>
              From lost to found,
              <span> made simple.</span>
            </h2>

            <p>
              A straightforward process designed to make recovering your
              belongings easier.
            </p>
          </div>


          <div className="process-grid">

            <div className="process-card">
              <div className="process-number">
                01
              </div>

              <div className="process-icon">
                <PackageSearch size={23} />
              </div>

              <h3>
                Report
              </h3>

              <p>
                Submit the details of a lost or found item with useful
                information and an optional image.
              </p>
            </div>


            <div className="process-line"></div>


            <div className="process-card">
              <div className="process-number">
                02
              </div>

              <div className="process-icon">
                <Search size={23} />
              </div>

              <h3>
                Discover
              </h3>

              <p>
                Browse reports and look for items that match what you're
                trying to find.
              </p>
            </div>


            <div className="process-line"></div>


            <div className="process-card">
              <div className="process-number">
                03
              </div>

              <div className="process-icon">
                <HeartHandshake size={23} />
              </div>

              <h3>
                Reconnect
              </h3>

              <p>
                Use the available information to connect with the person
                who can help return the item.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* CTA */}

      <section className="cta-section">
        <div className="container">

          <div className="cta-content">
            <div>
              <span className="cta-eyebrow">
                HAVE SOMETHING TO REPORT?
              </span>

              <h2>
                Every item has a story.
                <br />
                Help complete it.
              </h2>

              <p>
                Whether you've lost something or found something,
                reporting it takes just a few moments.
              </p>
            </div>

            <div className="cta-actions">
              <Link to="/lost" className="cta-button primary">
                Report Lost
                <ArrowRight size={18} />
              </Link>

              <Link to="/found" className="cta-button secondary">
                Report Found
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;