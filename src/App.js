import React from "react";
import Header from "./components/Header";
import "./styles/Header.scss";
import Movies from "./components/Movies";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";
import MovieSearchResults from "./components/MovieSearchResults";

function App() {
  const apiKey = "c45a857c193f6302f2b5061c3b85e743";

  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route
            path="/"
            element={<Movies key="popular" SortBy="popular" apiKey={apiKey} />}
          />
          <Route
            path="/top_rated"
            element={
              <Movies key="top_rated" SortBy="top_rated" apiKey={apiKey} />
            }
          />
          <Route
            path="/upcoming"
            element={
              <Movies key="upcoming" SortBy="upcoming" apiKey={apiKey} />
            }
          />
          <Route path="/movie/:id" element={<MovieDetails apiKey={apiKey} />} />
          <Route
            path="/search/:movie_name"
            element={<MovieSearchResults apiKey={apiKey} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
