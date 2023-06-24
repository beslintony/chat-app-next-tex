import { Redis, RedisConfigNodejs } from "@upstash/redis";

const redisConfig = {
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
} as RedisConfigNodejs;

export const redis = new Redis(redisConfig);
