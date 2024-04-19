export type Language = {
	id: number;
	name: string;
	official: boolean;
	iso639: string;
	iso3166: string;
	names: Array<{
		name: string;
		language: {
			name: string;
			url: string;
		};
	}>;
};
