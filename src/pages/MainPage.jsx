import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopular } from "../redux/actions/movieActions";
import Hero from "../components/Hero";
import { getGenres } from "../redux/actions/genreActions";
import store from "../redux/store";
import Loader from "../components/Loader";
import MovieList from "../components/MovieList";
import Error from "../components/Error";

const MainPage = () => {
  const { isLoading, error, genres } = useSelector((store) => store.genres);
  const dispatch = useDispatch(); // useDispatch hook'unu fonksiyon olarak çağırın
  useEffect(() => {
    dispatch(getPopular());
    dispatch(getGenres());
  }, []);
  return (
    <div>
      <Hero />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        genres.map((genre) => <MovieList key={genre.id} genre={genre} />)
      )}
    </div>
  );
};

export default MainPage;
