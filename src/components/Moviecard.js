import React from "react";

const Moviecard = (props) => {
  let { movieName, rating, posterUrl } = props;

  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${posterUrl}`}
          className="card-img-top"
          alt="no image found"
        />
        <div className="card-body">
          <h5 className="card-title">{movieName}</h5>
          <p className="card-text">
            <h6>Rating:</h6>
            {rating}
          </p>
        </div>
      </div>
    </>
  );
};

export default Moviecard;
