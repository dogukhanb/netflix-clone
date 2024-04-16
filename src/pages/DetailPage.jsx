import { useEffect, useState } from "react";
import api from "../utils/api";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { baseImgUrl } from "../constants";
import DetailDisplay from "../components/DetailDisplay";
import millify from "millify";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import ActorCard from "../components/ActorCard";

const DetailPage = () => {
  const [movie, setMovie] = useState(null);

  // URL'den film ID'sini al
  const { id } = useParams();

  // API'dan film detaylarını al
  useEffect(() => {
    const params = {
      append_to_response:
        "Account States, Alternative Titles, Changes, Credits, External IDs, Images, Keywords, Latest, Lists, Recommendations, Release Dates, Reviews, Similar, Translations, Videos, Watch, Providers, Add Rating, Delete Rating",
    };
    api
      .get(`movie/${id}`, { params })
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err));
  }, [id]); // id parametresini bağımlılık olarak ekleyin

  return (
    <div>
      {!movie ? (
        <Loader />
      ) : (
        <div>
          {/* Üst alan */}
          <div className="relative  ">
            <img
              className="object-center h-[45vh] w-[184vh] "
              src={baseImgUrl + movie.backdrop_path}
              alt=""
            />
            <div className="absolute bg-black inset-0 grid place-items-center bg-opacity-20">
              <h2 className="text-3xl font-semibold">{movie.title}</h2>
            </div>
          </div>
          {/* Orta Alan */}
          <div className="my-10 grid grid-cols-1 md:grid-cols-2 text-black">
            <div>
              {movie.genres && (
                <DetailDisplay title={"Kategoriler"} data={movie.genres} />
              )}
              {movie.spoken_languages && (
                <DetailDisplay
                  title={"Konuşulan Diller"}
                  data={movie.spoken_languages}
                />
              )}
              {movie.production_companies && (
                <DetailDisplay
                  title={"Yapımcı Şirketler"}
                  data={movie.production_companies}
                />
              )}
              {movie.production_countries && (
                <DetailDisplay
                  title={"Yapımcı Ülkeler"}
                  data={movie.production_countries}
                />
              )}
            </div>
            <div>
              <p>{movie.overview}</p>
              <p>
                <span>Bütçe: </span>
                <span className="text-green-500 ms-2">
                  $ {millify(movie.budget)}
                </span>
              </p>
              <p>
                <span>Hasılat: </span>
                <span className="text-green-500 ms-2">
                  $ {millify(movie.revenue)}
                </span>
              </p>
            </div>
          </div>
          {/* Alt Kısım */}
          <div>
            {movie.credits &&
              movie.credits.cast &&
              movie.credits.cast.length > 0 && (
                <Splide
                  options={{
                    autoWidth: true,
                    gap: "10px",
                    pagination: false,
                    lazyLoad: true,
                  }}
                >
                  {movie.credits.cast.map((actor, i) => (
                    <SplideSlide key={i}>
                      <ActorCard actor={actor} />
                    </SplideSlide>
                  ))}
                </Splide>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
