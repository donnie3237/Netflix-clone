import { Controller, Get, Param } from "@nestjs/common";
import { TmdbService } from "./tmdb.service";

@Controller("tmdb")
export class TmdbController {
  constructor(private readonly tmdbService: TmdbService) {}

  @Get("popular")
  getPopularMovies() {
    return this.tmdbService.getPopularMovies();
  }

  @Get("/:id")
  getMovieById(@Param("id") id: string) {
    return this.tmdbService.getMovieById(id);
  }
}
