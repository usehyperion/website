interface PageSeo {
	title: string;
	description: string;
	image?: string;
}

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			seo: PageSeo;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
