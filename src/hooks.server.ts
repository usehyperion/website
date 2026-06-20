import { redis } from "$lib/redis";

export async function init() {
	await redis.connect();
}
