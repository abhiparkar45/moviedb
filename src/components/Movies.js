import React, { useEffect, useState } from "react";
import Moviecard from "./Moviecard";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Pagination from "@material-ui/lab/Pagination";

const Movies = (props) => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(6);
  const navigate = useNavigate();
  const pageCount = Math.ceil(movies.length / moviesPerPage);

  const pageNumbers = [];
  const GetMovies = async () => {
    const url = `https://api.themoviedb.org/3/movie/${props.SortBy}?api_key=${props.apiKey}&language=en-US&page=${props.pageNumber}`;
    let getData = await fetch(url);
    let parsedData = await getData.json();
    setMovies(parsedData.results);
  };

  useEffect(() => {
    GetMovies();
  }, []);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const totalMovies = movies.length;

  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Container sx={{ py: 6 }} maxWidth="lg">
        <Grid container spacing={4}>
          <div className="resrow">
            {currentMovies.map((e) => (
              <div
                key={e.id}
                onClick={() => {
                  navigate(`/movie/${e.id}`);
                }}
                className="cardcolumn"
              >
                <Moviecard
                  movieID={e.id}
                  movieName={e.original_title}
                  rating={e.vote_average}
                  posterUrl={e.poster_path}
                />
              </div>
            ))}
          </div>

          <Pagination
            count={pageCount}
            color="secondary"
            size="large"
            variant="outlined"
            defaultPage={currentPage}
            style={{
              padding: 20,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            onChange={(event, value) => {
              setCurrentPage(value);
            }}
          />
        </Grid>
      </Container>
    </>
  );
};

Movies.defaultProps = {
  SortBy: "popular",
};
Movies.prototypes = {
  SortBy: PropTypes.string,
};
export default Movies;
