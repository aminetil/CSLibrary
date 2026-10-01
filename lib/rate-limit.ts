import { Redis } from "@upstash/redis";

let redis: Redis | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = Redis.fromEnv();
}

// Development fallback in-memory store
const memoryStore = new Map<string, { count: number; expiresAt: number }>();

export async function checkRateLimit(key: string, limit: number, windowSeconds: number): Promise<boolean> {
  if (redis) {
    try {
      const count = await redis.incr(key);
      if (count === 1) await redis.expire(key, windowSeconds);
      return count <= limit;
    } catch (err) {
      console.warn("Redis rate-limiting failed, falling back to memory store:", err);
    }
  }

  // Memory fallback
  const now = Date.now();
  const record = memoryStore.get(key);

  if (!record || record.expiresAt < now) {
    memoryStore.set(key, { count: 1, expiresAt: now + windowSeconds * 1000 });
    return true;
  }

  record.count += 1;
  return record.count <= limit;
}
