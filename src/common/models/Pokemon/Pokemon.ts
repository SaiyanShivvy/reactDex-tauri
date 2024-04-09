export interface Pokemon {
	id: number;
	name: string;
	base_experience: number;
	height: number;
	weight: number;
	species: Species;
	sprites: Sprites;
	abilities: Abilities[];
	moves: Moves[];
	stats: Stats[];
	types: Types[];
}

export interface Abilities {
	ability: Ability[];
	is_hidden: boolean;
	slot: number;
}

export interface Ability {
	name: string;
	url: string;
}

export interface Species {
	name: string;
	url: string;
}

export interface Sprites {
	back_default: string;
	back_female: any;
	back_shiny: string;
	back_shiny_female: any;
	front_default: string;
	front_female: any;
	front_shiny: string;
	front_shiny_female: any;
}

export interface Stats {
	base_stat: number;
	effort: number;
	stat: Stat;
}

export interface Stat {
	name: string;
	url: string;
}

export interface Types {
	slot: number;
	type: Type;
}

export interface Type {
	name: string;
	url: string;
}

export interface Moves {
	move: Move;
	version_group_details: VersionGroupDetail[];
}

export interface Move {
	name: string;
	url: string;
}

export interface VersionGroupDetail {
	level_learned_at: number;
	move_learn_method: MoveLearnMethod;
	version_group: VersionGroup;
}

export interface MoveLearnMethod {
	name: string;
	url: string;
}

export interface VersionGroup {
	name: string;
	url: string;
}

