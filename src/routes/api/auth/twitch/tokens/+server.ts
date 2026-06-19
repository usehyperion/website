import { error, json } from "@sveltejs/kit";
import { redis } from "$lib/redis";

export async function GET({ url }) {
	const userId = url.searchParams.get("user_id");
	if (!userId) {
		error(400, "Missing 'user_id' query parameter");
	}

	const value = await redis.json.get(userId, { path: "$" });
	const [tokens] = (value as [unknown]) || [];

	if (!tokens) {
		error(404, "Tokens not found");
	}

	return json(tokens);
}
