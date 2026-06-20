import { error } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";

export async function POST({ request, fetch }) {
	const token = request.headers.get("Authorization");
	if (!token) error(401);

	const response = await fetch("https://id.twitch.tv/oauth2/revoke", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			client_id: env.TWITCH_CLIENT_ID,
			token,
		}),
	});

	return response;
}
