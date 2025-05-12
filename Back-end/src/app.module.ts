import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { CacheModule } from "@nestjs/cache-manager";
import { TmdbService } from "./tmdb/tmdb.service";
import { TmdbController } from "./tmdb/tmdb.controller";
import * as redisStore from "cache-manager-redis-store";
import { ConfigModule } from "@nestjs/config";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    CacheModule.register({
      isGlobal: true,
      store: redisStore as any,
      host: "localhost",
      port: 6379,
      ttl: 600, // default 10 นาที
    }),
  ],
  controllers: [TmdbController, AppController],
  providers: [TmdbService, AppService],
})
export class AppModule {}
