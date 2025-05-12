import { Inject, Injectable } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class TmdbService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getPopularMovies() {
    const cacheKey = "tmdb:popular";
    const cached = await this.cacheManager.get(cacheKey);

    if (cached) {
      console.log("✅ Using cached data");
      return cached;
    }

    const token = this.configService.get<string>("TMDB_TOKEN");

    const res = await this.httpService.axiosRef.get(
      "https://api.themoviedb.org/3/movie/popular",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
      },
    );

    const data = res.data;
    await this.cacheManager.set(cacheKey, data, 600); // 10 นาที

    console.log("💾 Cached data");
    return data;
  }

  async getMovieById(id: string) {
    const cacheKey = `tmdb:movie:${id}`;
    const cached = await this.cacheManager.get(cacheKey);

    if (cached) {
      console.log("✅ Using cached data for movie:", id);
      return cached;
    }

    const token = this.configService.get<string>("TMDB_TOKEN");

    const res = await this.httpService.axiosRef.get(
      `https://api.themoviedb.org/3/movie/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
      },
    );

    const data = res.data;
    await this.cacheManager.set(cacheKey, data, 600); // 10 minutes

    console.log("💾 Cached data for movie:", id);
    return data;
  }
}
