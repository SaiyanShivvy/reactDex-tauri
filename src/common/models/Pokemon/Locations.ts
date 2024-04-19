export type Locations = {
	id: number;
	name: string;
	region: {
		name: string;
		url: string;
	};
	names: Array<{
		name: string;
		language: {
			name: string;
			url: string;
		};
	}>;
	game_indices: Array<{
		game_index: number;
		generation: {
			name: string;
			url: string;
		};
	}>;
	areas: Array<{
		name: string;
		url: string;
	}>;
};

export type LocationAreas = {
	id: number;
	name: string;
	game_index: number;
	encounter_method_rates: Array<{
		encounter_method: {
			name: string;
			url: string;
		};
		version_details: Array<{
			rate: number;
			version: {
				name: string;
				url: string;
			};
		}>;
	}>;
	location: {
		name: string;
		url: string;
	};
	names: Array<{
		name: string;
		language: {
			name: string;
			url: string;
		};
	}>;
	pokemon_encounters: Array<{
		pokemon: {
			name: string;
			url: string;
		};
		version_details: Array<{
			version: {
				name: string;
				url: string;
			};
			max_chance: number;
			encounter_details: Array<{
				min_level: number;
				max_level: number;
				condition_values: Array<any>;
				chance: number;
				method: {
					name: string;
					url: string;
				};
			}>;
		}>;
	}>;
};

export type PalParkAreas = {
	id: number;
	name: string;
	names: Array<{
		name: string;
		language: {
			name: string;
			url: string;
		};
	}>;
	pokemon_encounters: Array<{
		base_score: number;
		rate: number;
		pokemon_species: {
			name: string;
			url: string;
		};
	}>;
};

export type Regions = {
	id: number;
	name: string;
	locations: Array<{
		name: string;
		url: string;
	}>;
	main_generation: {
		name: string;
		url: string;
	};
	names: Array<{
		name: string;
		language: {
			name: string;
			url: string;
		};
	}>;
	pokedexes: Array<{
		name: string;
		url: string;
	}>;
	version_groups: Array<{
		name: string;
		url: string;
	}>;
};
