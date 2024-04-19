export type Berries = {
	id: number;
	name: string;
	growth_time: number;
	max_harvest: number;
	natural_gift_power: number;
	size: number;
	smoothness: number;
	soil_dryness: number;
	firmness: {
		name: string;
		url: string;
	};
	flavors: Array<{
		potency: number;
		flavor: {
			name: string;
			url: string;
		};
	}>;
	item: {
		name: string;
		url: string;
	};
	natural_gift_type: {
		name: string;
		url: string;
	};
};

export type BerryFirmness = {
	id: number;
	name: string;
	berries: Array<{
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

export type BerryFlavors = {
	id: number;
	name: string;
	berries: Array<{
		potency: number;
		berry: {
			name: string;
			url: string;
		};
	}>;
	contest_type: {
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
