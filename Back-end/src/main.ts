import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { FastifyAdapter } from "@nestjs/platform-fastify";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  app.enableCors();

  //rate limit
  app.use((req, res, next) => {
    const rateLimit = 100; 
    const timeWindow = 60 * 1000; 
    const ip = req.ip;
    const now = Date.now();

    if (!global.rateLimitStore) {
      global.rateLimitStore = {};
    }

    if (!global.rateLimitStore[ip]) {
      global.rateLimitStore[ip] = [];
    }

    global.rateLimitStore[ip] = global.rateLimitStore[ip].filter(
      (timestamp) => now - timestamp < timeWindow
    );

    if (global.rateLimitStore[ip].length >= rateLimit) {
      res.status(429).send('Too many requests. Please try again later.');
    } else {
      global.rateLimitStore[ip].push(now);
      next();
    }
  });
  await app.listen(8888,'0.0.0.0');
}

bootstrap();