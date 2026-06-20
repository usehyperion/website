import { error, json } from "@sveltejs/kit";

export async function GET({ url, platform }) {
	const userId = url.searchParams.get("user_id");
	if (!userId) {
		error(400, "Missing 'user_id' query parameter");
	}

	const kv = platform?.env.AUTH;
	if (!kv) error(500);

	const tokens = await kv.get(userId, "json");
	if (!tokens) {
		error(404, "Tokens not found");
	}

	return json(tokens);
}
