import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo/nestfy-site-logo.svg";

const NotFound = () => {
  return (
    <main className="notfound" role="main">
      <div className="notfound__wrap">
        <header className="notfound__brand" aria-label="Brand">
          <span className="notfound__logo">
            <img className="logos" draggable='false' src={logo} alt="Nestfy" />
          </span>
        </header>

        <section className="notfound__content">
          <div className="notfound__left">
            <h1 className="notfound__title">Oops!</h1>
            <p className="notfound__subtitle">
              We can't seem to find the page <br />
              you're looking for.
            </p>

            <p className="notfound__code">
              <strong>Error code:</strong> 404
            </p>

            <p className="notfound__helpTitle">
              Here are some helpful links instead:
            </p>

            <nav className="notfound__links" aria-label="Helpful links">
              <Link to="/en">Home</Link>
              <Link to="/search">Search</Link>
              <Link to="/en/help-center">Help</Link>
              <Link to="/travel">Traveling on NestFy</Link>
              <Link to="/host">Hosting on NestFy</Link>
              <Link to="/trust">Trust &amp; Safety</Link>
              <Link to="/sitemap">Sitemap</Link>
            </nav>
          </div>

          <div className="notfound__right">
            <img
              className="notfound__gif"
              draggable='false'
              src="https://a0.muscache.com/airbnb/static/error_pages/404-Airbnb_final-d652ff855b1335dd3eedc3baa8dc8b69.gif"
              alt="404 page not found"
              loading="lazy"
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default NotFound;