export type Items = {
	id: number;
	name: string;
	cost: number;
	fling_power: number;
	fling_effect: {
		name: string;
		url: string;
	};
	attributes: Array<{
		name: string;
		url: string;
	}>;
	category: {
		name: string;
		url: string;
	};
	effect_entries: Array<{
		effect: string;
		short_effect: string;
		language: {
			name: string;
			url: string;
		};
	}>;
	flavor_text_entries: Array<{
		text: string;
		version_group: {
			name: string;
			url: string;
		};
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
	names: Array<{
		name: string;
		language: {
			name: string;
			url: string;
		};
	}>;
	sprites: {
		default: string;
	};
	held_by_pokemon: Array<{
		pokemon: {
			name: string;
			url: string;
		};
		version_details: Array<{
			rarity: number;
			version: {
				name: string;
				url: string;
			};
		}>;
	}>;
	baby_trigger_for: {
		url: string;
	};
};

export type ItemAttributes = {
	id: number;
	name: string;
	descriptions: Array<{
		description: string;
		language: {
			name: string;
			url: string;
		};
	}>;
	items: Array<{
		name: string;
		url: string;
	}>;
	names: Array<{
		name: string;
		language: {
			name: string;
			url: string;
		};
	}>;
};

export type ItemCategories = {
	id: number;
	name: string;
	items: Array<{
		name: string;
		url: string;
	}>;
	names: Array<{
		name: string;
		language: {
			name: string;
			url: string;
		};
	}>;
	pocket: {
		name: string;
		url: string;
	};
};

export type ItemPockets = {
	id: number;
	name: string;
	categories: Array<{
		name: string;
		url: string;
	}>;
	names: Array<{
		name: string;
		language: {
			name: string;
			url: string;
		};
	}>;
};

export type ItemFlingEffects = {
	id: number;
	name: string;
	effect_entries: Array<{
		effect: string;
		language: {
			name: string;
			url: string;
		};
	}>;
	items: Array<{
		name: string;
		url: string;
	}>;
};
