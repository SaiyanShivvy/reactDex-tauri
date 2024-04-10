// apiService.ts
// REST API Calls
import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/";

export const getPokedex = async (url: string, limit: number): Promise<any> => {
	if (!url) {
		url = BASE_URL;
	}
	const api = `${url}pokemon?limit=${limit}`;
	try {
		const response = await axios.get(api);
		return response.data;
	} catch (error) {
		console.error("Error fetching Pokemon list:", error);
		throw error;
	}
};

export const getPokemonData = async (name: string): Promise<any> => {
	const url = `${BASE_URL}pokemon/${name}`;
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.error("Error fetching Pokemon data:", error);
		throw error;
	}
};

export const getPokemonEvolutionChain = async (id: number): Promise<any> => {
	const url = `${BASE_URL}evolution-chain/${id}`;
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.error("Error getting Evolution data: ", error);
		throw error;
	}
};

export const getPokemonSpeciesData = async (id: number): Promise<any> => {
	const url = `${BASE_URL}pokemon-species/${id}`;
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.error("Error getting Species data: ", error);
		throw error;
	}
};

export const getPokemonEggGroup = async (id: number): Promise<any> => {
	const url = `${BASE_URL}egg-group/${id}`;
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.error("Error getting Egg Group data: ", error);
		throw error;
	}
};

export const getPokemonTypes = async (id: number): Promise<any> => {
	const url = `${BASE_URL}type/${id}`;
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.error("Error getting Type data: ", error);
		throw error;
	}
};

export const getPokemonLocations = async (id: number): Promise<any> => {
	const url = `${BASE_URL}pokemon/${id}/encounters`;
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.error("Error getting Encounter Location data: ", error);
		throw error;
	}
};

export const getMoveData = async (name: string): Promise<any> => {
	const url = `${BASE_URL}move/${name}`;
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.error("Error getting Move data: ", error);
		throw error;
	}
};

export const getMachineData = async (id: number): Promise<any> => {
	const url = `${BASE_URL}machine/${id}`;
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.error("Error getting Machine data: ", error);
		throw error;
	}
};

// GraphQL Calls

const gql_endpoint = "https://beta.pokeapi.co/graphql/v1beta";

export async function getPokemonDetails(id: number) {
	const query = `
	`;

	try {
		const response = await axios.post(gql_endpoint, {
			query: query,
			variables: {
				id: id,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching Pokemon ability:", error);
		throw error;
	}
}

export async function getGameData() {
	const query = `
	query GenerationInfo {
		generation: pokemon_v2_generation {
			gen_name: name
			gen_id: id
			game_versions: pokemon_v2_versiongroups {
				group_id: id
				game_version: pokemon_v2_versions {
					game_id: id
					game_name: name
				}
			}
		}
	}
	`;

	try {
		const response = await axios.post(gql_endpoint, {
			query: query,
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching Game Information:", error);
		throw error;
	}
}
