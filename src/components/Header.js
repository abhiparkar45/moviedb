import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            MovieDb
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Popular
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/top_rated">
                  Top Rated
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/upcoming">
                  Upcoming
                </Link>
              </li>
            </ul>
            <div className="d-flex" role="search">
              <input
                onChange={(e) => setSearch(e.target.value)}
                className="form-control me-2"
                placeholder="Movie Name"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success"
                onClick={() => {
                  navigate(`/search/${search}`);
                }}
                type="submit"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
