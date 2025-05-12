"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Info, Play } from "lucide-react";
import { unstable_ViewTransition as ViewTransition } from "react";
import { FetchAPI } from "@/lib/utils";

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
}

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    FetchAPI.get("/tmdb/popular")
      .then((res) => {
        setMovies(res.data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  const hero = movies[0];

  return (
    <div className="bg-black text-white h-screen flex flex-col overflow-hidden">
      {/* Hero Section */}
      <div className="relative flex-grow w-full">
        {isLoading
          ? <div className="absolute inset-0 animate-pulse bg-gray-800" />
          : hero && (
            <>
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    `url(https://image.tmdb.org/t/p/original/${hero.backdrop_path})`,
                }}
              />
              <div className="absolute inset-0 flex-col justify-end px-6 md:px-12 bg-gradient-to-t from-black via-transparent to-black/40 hidden md:flex">
                <div className="max-w-lg mb-6">
                  <h2 className="text-3xl md:text-5xl font-bold mb-2 drop-shadow-md">
                    {hero.title}
                  </h2>
                  <p className="hidden md:block text-sm text-gray-200 drop-shadow-lg">
                    {hero.overview}
                  </p>
                </div>
                <div className="flex space-x-4 mb-6">
                  <button
                    onClick={() => {
                      router.push(`/movie/${hero.id}`);
                    }}
                    className="bg-white text-black px-6 py-2 rounded flex items-center font-semibold hover:bg-gray-200"
                  >
                    <Play className="w-5 h-5 mr-2" /> Play
                  </button>
                  <button className="bg-gray-700 bg-opacity-70 px-6 py-2 rounded flex items-center hover:bg-opacity-50">
                    <Info className="w-5 h-5 mr-2" /> More Info
                  </button>
                </div>
              </div>
              <div className="absolute h-[10vh] bottom-0 flex justify-center w-[100vw] items-center gap-x-4 text-xs md:text-base bg-gradient-to-t from-black via-transparent to-black/40 bg-black md:!hidden">
                {/* My List Button */}
                <button className="flex flex-col md:hidden items-center text-white hover:opacity-80">
                  <span className="text-3xl leading-none">＋</span>
                  <span className="mt-1">My List</span>
                </button>

                {/* Play Button */}
                <button
                  onClick={() => router.push(`/movie/${hero.id}`)}
                  className="bg-white md:hidden text-black px-4 py-1.5 md:px-6 md:py-2 rounded flex items-center font-semibold hover:bg-gray-200"
                >
                  <Play className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                  Play
                </button>

                {/* Info Button */}
                <button className="flex flex-col items-center text-white hover:opacity-80">
                  <Info className="w-5 h-5" />
                  <span className="mt-1">Info</span>
                </button>
              </div>
            </>
          )}
      </div>

      {/* Popular Section */}
      <section className="h-[180px] md:h-[220px] px-6 md:px-12 relative z-10 bg-black md:bg-transparent">
        <h3 className="text-xl font-bold mb-2">Popular on Netflix</h3>
        <div className="flex overflow-x-auto gap-4 scrollbar-hide pb-2">
          {isLoading
            ? Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[120px] sm:w-[160px] md:w-[240px] h-full bg-gray-800 rounded animate-pulse"
              />
            ))
            : movies.slice(1, 11).map((movie) => (
              <ViewTransition name={`movie-${movie.id}`} key={movie.id}>
                <div
                  className="flex-shrink-0 w-[120px] sm:w-[160px] md:w-[240px] cursor-pointer hover:scale-105 transition-transform"
                  onClick={() =>
                    router.push(`/movie/${movie.id}`)}
                >
                  <picture>
                    <source
                      media="(min-width: 768px)"
                      srcSet={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    />
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="rounded w-full h-full object-cover"
                    />
                  </picture>
                </div>
              </ViewTransition>
            ))}
        </div>
      </section>
    </div>
  );
}
