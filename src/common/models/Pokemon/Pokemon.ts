export type Abilities = {
	id: number;
	name: string;
	is_main_series: boolean;
	generation: {
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
	effect_entries: Array<{
		effect: string;
		short_effect: string;
		language: {
			name: string;
			url: string;
		};
	}>;
	effect_changes: Array<{
		version_group: {
			name: string;
			url: string;
		};
		effect_entries: Array<{
			effect: string;
			language: {
				name: string;
				url: string;
			};
		}>;
	}>;
	flavor_text_entries: Array<{
		flavor_text: string;
		language: {
			name: string;
			url: string;
		};
		version_group: {
			name: string;
			url: string;
		};
	}>;
	pokemon: Array<{
		is_hidden: boolean;
		slot: number;
		pokemon: {
			name: string;
			url: string;
		};
	}>;
};

export type EggGroups = {
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

export type GrowthRates = {
	id: number;
	name: string;
	formula: string;
	descriptions: Array<{
		description: string;
		language: {
			name: string;
			url: string;
		};
	}>;
	levels: Array<{
		level: number;
		experience: number;
	}>;
	pokemon_species: Array<{
		name: string;
		url: string;
	}>;
};

export type Natures = {
	id: number;
	name: string;
	decreased_stat: {
		name: string;
		url: string;
	};
	increased_stat: {
		name: string;
		url: string;
	};
	likes_flavor: {
		name: string;
		url: string;
	};
	hates_flavor: {
		name: string;
		url: string;
	};
	pokeathlon_stat_changes: Array<{
		max_change: number;
		pokeathlon_stat: {
			name: string;
			url: string;
		};
	}>;
	move_battle_style_preferences: Array<{
		low_hp_preference: number;
		high_hp_preference: number;
		move_battle_style: {
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
};

export type Pokemon = {
	id: number;
	name: string;
	base_experience: number;
	height: number;
	is_default: boolean;
	order: number;
	weight: number;
	abilities: Array<{
		is_hidden: boolean;
		slot: number;
		ability: {
			name: string;
			url: string;
		};
	}>;
	forms: Array<{
		name: string;
		url: string;
	}>;
	game_indices: Array<{
		game_index: number;
		version: {
			name: string;
			url: string;
		};
	}>;
	held_items: Array<{
		item: {
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
	location_area_encounters: string;
	moves: Array<{
		move: {
			name: string;
			url: string;
		};
		version_group_details: Array<{
			level_learned_at: number;
			version_group: {
				name: string;
				url: string;
			};
			move_learn_method: {
				name: string;
				url: string;
			};
		}>;
	}>;
	species: {
		name: string;
		url: string;
	};
	sprites: {
		back_default: string;
		back_female: any;
		back_shiny: string;
		back_shiny_female: any;
		front_default: string;
		front_female: any;
		front_shiny: string;
		front_shiny_female: any;
		other: {
			dream_world: {
				front_default: string;
				front_female: any;
			};
			home: {
				front_default: string;
				front_female: any;
				front_shiny: string;
				front_shiny_female: any;
			};
			"official-artwork": {
				front_default: string;
				front_shiny: string;
			};
			showdown: {
				back_default: string;
				back_female: any;
				back_shiny: string;
				back_shiny_female: any;
				front_default: string;
				front_female: any;
				front_shiny: string;
				front_shiny_female: any;
			};
		};
		versions: {
			"generation-i": {
				"red-blue": {
					back_default: string;
					back_gray: string;
					front_default: string;
					front_gray: string;
				};
				yellow: {
					back_default: string;
					back_gray: string;
					front_default: string;
					front_gray: string;
				};
			};
			"generation-ii": {
				crystal: {
					back_default: string;
					back_shiny: string;
					front_default: string;
					front_shiny: string;
				};
				gold: {
					back_default: string;
					back_shiny: string;
					front_default: string;
					front_shiny: string;
				};
				silver: {
					back_default: string;
					back_shiny: string;
					front_default: string;
					front_shiny: string;
				};
			};
			"generation-iii": {
				emerald: {
					front_default: string;
					front_shiny: string;
				};
				"firered-leafgreen": {
					back_default: string;
					back_shiny: string;
					front_default: string;
					front_shiny: string;
				};
				"ruby-sapphire": {
					back_default: string;
					back_shiny: string;
					front_default: string;
					front_shiny: string;
				};
			};
			"generation-iv": {
				"diamond-pearl": {
					back_default: string;
					back_female: any;
					back_shiny: string;
					back_shiny_female: any;
					front_default: string;
					front_female: any;
					front_shiny: string;
					front_shiny_female: any;
				};
				"heartgold-soulsilver": {
					back_default: string;
					back_female: any;
					back_shiny: string;
					back_shiny_female: any;
					front_default: string;
					front_female: any;
					front_shiny: string;
					front_shiny_female: any;
				};
				platinum: {
					back_default: string;
					back_female: any;
					back_shiny: string;
					back_shiny_female: any;
					front_default: string;
					front_female: any;
					front_shiny: string;
					front_shiny_female: any;
				};
			};
			"generation-v": {
				"black-white": {
					animated: {
						back_default: string;
						back_female: any;
						back_shiny: string;
						back_shiny_female: any;
						front_default: string;
						front_female: any;
						front_shiny: string;
						front_shiny_female: any;
					};
					back_default: string;
					back_female: any;
					back_shiny: string;
					back_shiny_female: any;
					front_default: string;
					front_female: any;
					front_shiny: string;
					front_shiny_female: any;
				};
			};
			"generation-vi": {
				"omegaruby-alphasapphire": {
					front_default: string;
					front_female: any;
					front_shiny: string;
					front_shiny_female: any;
				};
				"x-y": {
					front_default: string;
					front_female: any;
					front_shiny: string;
					front_shiny_female: any;
				};
			};
			"generation-vii": {
				icons: {
					front_default: string;
					front_female: any;
				};
				"ultra-sun-ultra-moon": {
					front_default: string;
					front_female: any;
					front_shiny: string;
					front_shiny_female: any;
				};
			};
			"generation-viii": {
				icons: {
					front_default: string;
					front_female: any;
				};
			};
		};
	};
	cries: {
		latest: string;
		legacy: string;
	};
	stats: Array<{
		base_stat: number;
		effort: number;
		stat: {
			name: string;
			url: string;
		};
	}>;
	types: Array<{
		slot: number;
		type: {
			name: string;
			url: string;
		};
	}>;
	past_types: Array<{
		generation: {
			name: string;
			url: string;
		};
		types: Array<{
			slot: number;
			type: {
				name: string;
				url: string;
			};
		}>;
	}>;
};

export type PokemonLocationAreas = Array<{
	location_area: {
		name: string;
		url: string;
	};
	version_details: Array<{
		max_chance: number;
		encounter_details: Array<{
			min_level: number;
			max_level: number;
			condition_values: Array<{
				name: string;
				url: string;
			}>;
			chance: number;
			method: {
				name: string;
				url: string;
			};
		}>;
		version: {
			name: string;
			url: string;
		};
	}>;
}>;

export type PokemonHabitats = {
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

export type PokemonSpecies = {
	id: number;
	name: string;
	order: number;
	gender_rate: number;
	capture_rate: number;
	base_happiness: number;
	is_baby: boolean;
	is_legendary: boolean;
	is_mythical: boolean;
	hatch_counter: number;
	has_gender_differences: boolean;
	forms_switchable: boolean;
	growth_rate: {
		name: string;
		url: string;
	};
	pokedex_numbers: Array<{
		entry_number: number;
		pokedex: {
			name: string;
			url: string;
		};
	}>;
	egg_groups: Array<{
		name: string;
		url: string;
	}>;
	color: {
		name: string;
		url: string;
	};
	shape: {
		name: string;
		url: string;
	};
	evolves_from_species: {
		name: string;
		url: string;
	};
	evolution_chain: {
		url: string;
	};
	habitat: any;
	generation: {
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
	flavor_text_entries: Array<{
		flavor_text: string;
		language: {
			name: string;
			url: string;
		};
		version: {
			name: string;
			url: string;
		};
	}>;
	form_descriptions: Array<{
		description: string;
		language: {
			name: string;
			url: string;
		};
	}>;
	genera: Array<{
		genus: string;
		language: {
			name: string;
			url: string;
		};
	}>;
	varieties: Array<{
		is_default: boolean;
		pokemon: {
			name: string;
			url: string;
		};
	}>;
};

export type Stats = {
	id: number;
	name: string;
	game_index: number;
	is_battle_only: boolean;
	affecting_moves: {
		increase: Array<{
			change: number;
			move: {
				name: string;
				url: string;
			};
		}>;
		decrease: Array<{
			change: number;
			move: {
				name: string;
				url: string;
			};
		}>;
	};
	affecting_natures: {
		increase: Array<{
			name: string;
			url: string;
		}>;
		decrease: Array<{
			name: string;
			url: string;
		}>;
	};
	characteristics: Array<{
		url: string;
	}>;
	move_damage_class: {
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
};

export type Types = {
	id: number;
	name: string;
	damage_relations: {
		no_damage_to: Array<{
			name: string;
			url: string;
		}>;
		half_damage_to: Array<{
			name: string;
			url: string;
		}>;
		double_damage_to: Array<{
			name: string;
			url: string;
		}>;
		no_damage_from: Array<{
			name: string;
			url: string;
		}>;
		half_damage_from: Array<{
			name: string;
			url: string;
		}>;
		double_damage_from: Array<{
			name: string;
			url: string;
		}>;
	};
	past_damage_relations: Array<{
		generation: {
			name: string;
			url: string;
		};
		damage_relations: {
			no_damage_to: Array<{
				name: string;
				url: string;
			}>;
			half_damage_to: Array<{
				name: string;
				url: string;
			}>;
			double_damage_to: Array<{
				name: string;
				url: string;
			}>;
			no_damage_from: Array<{
				name: string;
				url: string;
			}>;
			half_damage_from: Array<{
				name: string;
				url: string;
			}>;
			double_damage_from: Array<{
				name: string;
				url: string;
			}>;
		};
	}>;
	game_indices: Array<{
		game_index: number;
		generation: {
			name: string;
			url: string;
		};
	}>;
	generation: {
		name: string;
		url: string;
	};
	move_damage_class: {
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
	pokemon: Array<{
		slot: number;
		pokemon: {
			name: string;
			url: string;
		};
	}>;
	moves: Array<{
		name: string;
		url: string;
	}>;
};
