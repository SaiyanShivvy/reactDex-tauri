export type Version = {
	id: number;
	name: string;
	names: Array<{
		name: string;
		language: {
			name: string;
			url: string;
		};
	}>;
	version_group: {
		name: string;
		url: string;
	};
};

export type VersionGroups = {
	id: number;
	name: string;
	order: number;
	generation: {
		name: string;
		url: string;
	};
	move_learn_methods: Array<{
		name: string;
		url: string;
	}>;
	pokedexes: Array<{
		name: string;
		url: string;
	}>;
	regions: Array<{
		name: string;
		url: string;
	}>;
	versions: Array<{
		name: string;
		url: string;
	}>;
};
