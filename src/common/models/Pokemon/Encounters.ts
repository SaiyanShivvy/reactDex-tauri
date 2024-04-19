export type EncounterMethod = {
	id: number;
	name: string;
	order: number;
	names: Array<{
		name: string;
		language: {
			name: string;
			url: string;
		};
	}>;
};

export type EncounterConditions = {
	id: number;
	name: string;
	values: Array<{
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

export type EncounterConditionValues = {
	id: number;
	name: string;
	condition: {
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
