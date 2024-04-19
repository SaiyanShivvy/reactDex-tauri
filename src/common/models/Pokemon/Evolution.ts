export type EvolutionChain = {
	id: number;
	baby_trigger_item: any;
	chain: {
		is_baby: boolean;
		species: {
			name: string;
			url: string;
		};
		evolution_details: any;
		evolves_to: Array<{
			is_baby: boolean;
			species: {
				name: string;
				url: string;
			};
			evolution_details: Array<{
				item: any;
				trigger: {
					name: string;
					url: string;
				};
				gender: any;
				held_item: any;
				known_move: any;
				known_move_type: any;
				location: any;
				min_level: number;
				min_happiness: any;
				min_beauty: any;
				min_affection: any;
				needs_overworld_rain: boolean;
				party_species: any;
				party_type: any;
				relative_physical_stats: any;
				time_of_day: string;
				trade_species: any;
				turn_upside_down: boolean;
			}>;
			evolves_to: Array<any>;
		}>;
	};
};

export type EvolutionTrigger = {
	id: number;
	name: string;
	names: Array<{
		name: string;
		language: {
			name: string;
			url: string;
		};
	}>;
	pokemon_species: Array<{
		name: string;
		url: string;
	}>;
};
