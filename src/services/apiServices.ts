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

export const getPokemonSpeciesData = async (url: string): Promise<any> => {
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.error("Error getting Species data: ", error);
		throw error;
	}
};

export const getPokemonEvolutionChain = async (url: string): Promise<any> => {
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.error("Error getting Evolution data: ", error);
		throw error;
	}
};

export const getPokemonEggGroup = async (url: string): Promise<any> => {
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.error("Error getting Egg Group data: ", error);
		throw error;
	}
};

export const getPokemonTypes = async (url: string): Promise<any> => {
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.error("Error getting Type data: ", error);
		throw error;
	}
};

export const getPokemonLocations = async (url: string): Promise<any> => {
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.error("Error getting Encounter Location data: ", error);
		throw error;
	}
};

export const getMoveData = async (url: string): Promise<any> => {
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.error("Error getting Move data: ", error);
		throw error;
	}
};

export const getMachineData = async (url: string): Promise<any> => {
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.error("Error getting Machine data: ", error);
		throw error;
	}
};

export const getLocationArea = async (url: string): Promise<any> => {
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

export async function getPokemonDetails(name: string) {
	const query = `
	query GetPokemonDetails($name: String!) {
		Moves: pokemon_v2_pokemonmove(where: {pokemon_v2_pokemon: {name: {_eq: $name}}}) {
		  move_id
		  level
		  move_learn_method_id
		  version_group_id
		  game_version: pokemon_v2_versiongroup {
			name
			generation_id
			generation: pokemon_v2_generation {
			  name
			}
		  }
		  learn_method: pokemon_v2_movelearnmethod {
			name
		  }
		  move: pokemon_v2_move {
			accuracy
			name
			move_effect: pokemon_v2_moveeffect {
			  effect_text: pokemon_v2_moveeffecteffecttexts {
				effect
          		short_effect
			  }
			}
			move_effect_chance
			power
			pp
			priority
			move_type: pokemon_v2_type {
				name
			  }
		  }
		}
	  }
	`;

	try {
		const response = await axios.post(gql_endpoint, {
			query: query,
			variables: {
				name: name,
			},
		});
		return response.data.data;
	} catch (error) {
		console.error("Error fetching data:", error);
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
