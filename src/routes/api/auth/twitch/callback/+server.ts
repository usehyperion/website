import { error } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import { TWITCH_REDIRECT_URI } from "$env/static/private";

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

	const params = new URLSearchParams({
		user_id: valid.user_id,
		access_token: tokens.access_token,
		refresh_token: tokens.refresh_token,
	});

	return Response.redirect(`hyperion://auth?${params.toString()}`);
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
