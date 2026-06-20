import { error } from "@sveltejs/kit";
import { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } from "$env/static/private";

export async function POST({ request }) {
	const { refresh_token } = await request.json();
	if (!refresh_token) {
		error(400, "Missing refresh token");
	}

	const response = await fetch("https://id.twitch.tv/oauth2/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			grant_type: "refresh_token",
			client_id: TWITCH_CLIENT_ID,
			client_secret: TWITCH_CLIENT_SECRET,
			refresh_token,
		}),
	});

	return response;
}
