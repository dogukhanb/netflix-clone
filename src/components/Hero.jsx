import { useSelector } from "react-redux";
import Loader from "./Loader";
import Error from "./Error";
import { baseImgUrl } from "../constants";

const Hero = () => {
  const { isLoading, error, movies } = useSelector((store) => store.movies);

  // 0-19 arasında rastgele sayı üret
  const i = Math.floor(Math.random() * movies.length);
  // rastgele üretilen sıradaki elemana eriş

  const movie = movies[i];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:max-h-[400px] gap-5 mb-10">
      {!movie || isLoading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        movie && (
          <>
            <div className=" text-black flex flex-col gap-6 items-center justify-center">
              <h1 className="text-3xl font-bold ">{movie.title}</h1>
              <p className="text-start text-xl">{movie.overview}</p>
              <p>
                <span>IMDB:</span>
                <span className=" text-black  ms-2 font-semibold">
                  {movie.vote_average.toFixed(1)}
                </span>
              </p>

              <div className=" grid gap-4 ">
                <button className="p-2 bg-red-600 rounded text-white hover:bg-red-700">
                  Film İzle{" "}
                </button>
                <button className=" p-2 bg-red-600 rounded  text-white hover:bg-red-700">
                  Listeye Ekle
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                className="hero-img my-4 object-contain rounded max-h-[300px]"
                src={baseImgUrl + movie.backdrop_path}
                alt=""
              />
            </div>
          </>
        )
      )}
    </div>
  );
};

export default Hero;
