"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  unstable_ViewTransition as ViewTransition,
  useEffect,
  useState,
} from "react";
import { FetchAPI } from "@/lib/utils";
import { ArrowLeft, Star } from "lucide-react";

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  runtime: number;
  genres: Genre[];
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
}

const MovieSkeleton = () => (
  <div className="flex flex-col lg:flex-row items-center gap-8 p-8 bg-black/70 rounded-xl backdrop-blur-md max-w-4xl w-full sm:w-[90%] md:w-[75%] lg:w-[60%] xl:w-[50%]">
    <div className="relative w-[150px] lg:w-[250px] aspect-[2/3] overflow-hidden rounded-lg shadow-lg animate-pulse">
      <div className="absolute inset-0 bg-gray-700/50 animate-shimmer rounded-lg" />
    </div>
    <div className="flex flex-col justify-center text-white w-full lg:max-w-[60%] gap-3">
      <div className="w-3/4 h-8 bg-gray-700/50 rounded-md animate-pulse" />
      <div className="w-full h-16 bg-gray-700/50 rounded-md animate-pulse" />
      <div className="space-y-2">
        <div className="w-1/2 h-4 bg-gray-700/50 rounded-md animate-pulse" />
        <div className="w-1/3 h-4 bg-gray-700/50 rounded-md animate-pulse" />
        <div className="w-2/5 h-4 bg-gray-700/50 rounded-md animate-pulse" />
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-gray-700/50 animate-pulse" />
          <div className="w-1/4 h-4 bg-gray-700/50 rounded-md animate-pulse" />
        </div>
      </div>
      <div className="w-1/3 h-10 bg-gray-700/50 rounded-md mt-4 animate-pulse" />
    </div>
  </div>
);

export default function Page() {
  const pathname = usePathname();
  const slug = pathname.split("/").pop();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (slug) {
      FetchAPI.get(`/tmdb/${slug}`)
        .then((res) => setMovie(res.data))
        .catch(console.error);
    }
  }, [slug]);

  return (
    <div
      className="w-screen h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{
        backgroundImage: movie
          ? `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`
          : undefined,
      }}
    >
      <ViewTransition name={`movie-${slug}`}>
        {movie
          ? (
            <div className="flex flex-col lg:flex-row items-center gap-8 p-8 bg-black/70 rounded-xl backdrop-blur-md max-w-4xl w-full sm:w-[90%] md:w-[75%] lg:w-[60%] xl:w-[50%]">
              <div className="relative w-[150px] lg:w-[250px] aspect-[2/3] overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:scale-105">
                <Image
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL="/blur-placeholder.png"
                />
              </div>
              <div className="flex flex-col justify-center text-white w-full lg:max-w-[60%]">
                <h1 className="text-3xl font-semibold text-center lg:text-left">
                  {movie.title}
                </h1>
                <p className="text-gray-300 text-sm mt-2 text-center lg:text-left">
                  {movie.overview}
                </p>
                <div className="text-gray-400 text-sm mt-4 space-y-2">
                  <p>
                    <strong>Release Date:</strong> {movie.release_date}
                  </p>
                  <p>
                    <strong>Runtime:</strong> {movie.runtime} minutes
                  </p>
                  <p>
                    <strong>Genres:</strong> {movie.genres.map((g) =>
                      g.name
                    ).join(", ")}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Star className="text-yellow-400" />
                    <p>
                      <strong>Rating:</strong> {movie.vote_average}/10
                    </p>
                  </div>
                </div>
                <Link
                  className="flex items-center gap-2 text-white mt-6 inline-block py-2 px-4 rounded-md border-2 border-white hover:bg-white hover:text-black transition duration-300 self-center lg:self-start"
                  href="/"
                >
                  <ArrowLeft /> Back
                </Link>
              </div>
            </div>
          )
          : <MovieSkeleton />}
      </ViewTransition>
    </div>
  );
}
