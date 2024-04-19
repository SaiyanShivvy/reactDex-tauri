export type Moves = {
	id: number;
	name: string;
	accuracy: number;
	effect_chance: any;
	pp: number;
	priority: number;
	power: number;
	contest_combos: {
		normal: {
			use_before: Array<{
				name: string;
				url: string;
			}>;
			use_after: any;
		};
		super: {
			use_before: any;
			use_after: any;
		};
	};
	contest_type: {
		name: string;
		url: string;
	};
	contest_effect: {
		url: string;
	};
	damage_class: {
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
	effect_changes: Array<any>;
	generation: {
		name: string;
		url: string;
	};
	meta: {
		ailment: {
			name: string;
			url: string;
		};
		category: {
			name: string;
			url: string;
		};
		min_hits: any;
		max_hits: any;
		min_turns: any;
		max_turns: any;
		drain: number;
		healing: number;
		crit_rate: number;
		ailment_chance: number;
		flinch_chance: number;
		stat_chance: number;
	};
	names: Array<{
		name: string;
		language: {
			name: string;
			url: string;
		};
	}>;
	past_values: Array<any>;
	stat_changes: Array<any>;
	super_contest_effect: {
		url: string;
	};
	target: {
		name: string;
		url: string;
	};
	type: {
		name: string;
		url: string;
	};
	learned_by_pokemon: Array<{
		name: string;
		url: string;
	}>;
	flavor_text_entries: Array<{
		flavor_text: string;
		language: {
			url: string;
			name: string;
		};
		version_group: {
			url: string;
			name: string;
		};
	}>;
};

export type MoveAilments = {
	id: number;
	name: string;
	moves: Array<{
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

export type MoveBattleStyles = {
	id: number;
	name: string;
	names: Array<{
		name: string;
		language: {
			name: string;
			url: string;
		};
	}>;
};

export type MoveCategories = {
	id: number;
	name: string;
	descriptions: Array<{
		description: string;
		language: {
			name: string;
			url: string;
		};
	}>;
	moves: Array<{
		name: string;
		url: string;
	}>;
};

export type MoveDamageClasses = {
	id: number;
	name: string;
	descriptions: Array<{
		description: string;
		language: {
			name: string;
			url: string;
		};
	}>;
	moves: Array<{
		name: string;
		url: string;
	}>;
};

export type MoveLeanMethods = {
	id: number;
	name: string;
	names: Array<{
		name: string;
		language: {
			name: string;
			url: string;
		};
	}>;
	descriptions: Array<{
		description: string;
		language: {
			name: string;
			url: string;
		};
	}>;
	version_groups: Array<{
		name: string;
		url: string;
	}>;
};

export type MoveTargets = {
	id: number;
	name: string;
	descriptions: Array<{
		description: string;
		language: {
			name: string;
			url: string;
		};
	}>;
	moves: Array<{
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
