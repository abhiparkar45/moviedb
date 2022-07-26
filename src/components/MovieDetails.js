import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Pagination from "@material-ui/lab/Pagination";

const MovieDetails = (props) => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState([]);
  const [movieCast, setMovieCast] = useState([]);
  const [currentCastPage, setCurrentCastPage] = useState(1);
  const [castPerPage, setCastPerPage] = useState(6);
  const castPageCount = Math.ceil(movieCast.length / castPerPage);
  const [genre, setGenre] = useState([]);
  const [castID, setCastID] = useState([]);

  const getMovieDetails = async () => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${props.apiKey}&language=en-US`;
    let getData = await fetch(url);
    let parsedData = await getData.json();
    setMovieDetail(parsedData);
    setGenre(parsedData.genres);
  };

  const getCastdetails = async () => {
    const castUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${props.apiKey}&language=en-US`;
    let getCastData = await fetch(castUrl);
    let parsedCastData = await getCastData.json();
    setMovieCast(parsedCastData.cast);
    setCastID(movieCast.cast_id);
  };

  useEffect(() => {
    getMovieDetails();
    getCastdetails();
  });

  const indexOfLastCast = currentCastPage * castPerPage;
  const indexOfFirstCast = indexOfLastCast - castPerPage;
  const currentCast = movieCast.slice(indexOfFirstCast, indexOfLastCast);

  return (
    <>
      <div className="div-container0">
        <div className="div-left-container0">
          <div className="div-left-top0">
            <div className="div-small-container10">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`}
                alt="Image Not Found"
              ></img>
            </div>
            <div className="div-info-container0">
              <h3>{movieDetail.original_title}</h3>
              <p>
                <b>Rating :{movieDetail.vote_average}</b>
              </p>
              <p>{movieDetail.runtime} mins</p>
              <p>Release Date:{movieDetail.release_date}</p>

              <small>
                <b>Genre : </b>
                {genre.map((element) => {
                  return (
                    <text style={{ color: "green" }} key={element.id}>
                      {element.name}
                      {"  "}
                    </text>
                  );
                })}
              </small>
            </div>
          </div>
          <div className="div-overview0">
            <b>Overview:</b>
            <p>{movieDetail.overview}</p>
          </div>
        </div>
        <div className=".div-big-img-container0">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieDetail.backdrop_path}`}
            alt="MOM"
            width="800"
            height="400"
          ></img>
        </div>
      </div>
      <hr />
      <main>
        <Grid container>
          <h1
            className="cast-center"
            style={{ color: "white", margin: "auto" }}
          >
            Cast
          </h1>
        </Grid>
        <Container sx={{ py: 6 }} maxWidth="lg">
          <Grid container>
            {currentCast.map((e) => {
              return (
                <div key={e.castID} className="castcolumn">
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        // 16:9
                        pt: "0%",
                      }}
                      image={`https://image.tmdb.org/t/p/w500/${e.profile_path}`}
                      alt="no image found"
                    />

                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {e.original_name}
                      </Typography>
                      <Typography>
                        <br></br>
                        Character:
                        {e.character}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
            <Pagination
              count={castPageCount}
              color="secondary"
              size="large"
              variant="outlined"
              defaultPage={currentCastPage}
              style={{
                padding: 20,
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
              onChange={(event, value) => {
                setCurrentCastPage(value);
              }}
            />
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default MovieDetails;
