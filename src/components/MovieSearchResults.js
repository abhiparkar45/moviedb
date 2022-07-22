import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import Moviecard from "./Moviecard";
import Grid from "@mui/material/Grid";
import Pagination from "@material-ui/lab/Pagination";

const MovieSearchResults = (props) => {
  const navigate = useNavigate();
  const { movie_name } = useParams();
  const [searchResult, setSearchResult] = useState([]);
  const [currentSearchPage, setCurrentSearchPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(3);
  const resultCount = Math.ceil(searchResult.length / resultsPerPage);

  const indexOfLastResult = currentSearchPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = searchResult.slice(
    indexOfFirstResult,
    indexOfLastResult
  );

  const getSearchResult = async () => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${props.apiKey}&language=en-US&query=${movie_name}&page=1`;
    let getSearchResult = await fetch(url);
    let parsedSearchResult = await getSearchResult.json();
    setSearchResult(parsedSearchResult.results);
  };

  useEffect(() => {
    getSearchResult();
  });

  return (
    <>
      <Container sx={{ py: 6 }} maxWidth="lg">
        <Grid container spacing={4}>
          <div className="resrow">
            {currentResults.map((e) => (
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
        </Grid>
      </Container>
      <Pagination
        count={resultCount}
        color="secondary"
        size="large"
        variant="outlined"
        defaultPage={currentSearchPage}
        style={{
          padding: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        onChange={(event, value) => {
          setCurrentSearchPage(value);
        }}
      />
    </>
  );
};

export default MovieSearchResults;
