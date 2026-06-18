import dayjs from "dayjs";
import { releases } from "$content";

export function load() {
	const [latest] = releases.toSorted((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix());

	return {
		version: latest.version,
		date: latest.date,
		seo: {
			title: "Download - Hyperion",
			description:
				"Download Hyperion for macOS, Windows, and Linux. Free, open source, and built in the open.",
		},
	};
}
