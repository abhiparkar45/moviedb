import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  return (
    <div style={{ padding: "60px" }}>
      <div className="d-flex" role="search">
        <input
          onChange={(e) => setSearch(e.target.value)}
          className="form-control me-2"
          placeholder="Search"
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
  );
};

export default Search;
