import { error } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import { TWITCH_REDIRECT_URI } from "$env/static/private";
import { redis } from "$lib/redis.js";

export async function GET({ url }) {
	const code = url.searchParams.get("code");
	if (!code) {
		error(400, "Missing 'code' query parameter");
	}

	const response = await fetch("https://id.twitch.tv/oauth2/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			client_id: env.TWITCH_CLIENT_ID,
			client_secret: env.TWITCH_CLIENT_SECRET,
			code,
			grant_type: "authorization_code",
			redirect_uri: TWITCH_REDIRECT_URI,
		}),
	});

	const tokens = await response.json();
	const valid = await validate(tokens.access_token);

	// should never be invalid
	if (!valid) error(500);

	await redis.json.set(valid.user_id, "$", {
		access_token: tokens.access_token,
		refresh_token: tokens.refresh_token,
	});

	await redis.expire(valid.user_id, 60);

	return Response.redirect(`hyperion://auth?user_id=${valid.user_id}`);
}

async function validate(token: string) {
	const response = await fetch("https://id.twitch.tv/oauth2/validate", {
		headers: {
			Authorization: `OAuth ${token}`,
		},
	});

	if (response.ok) {
		return response.json();
	}
}
