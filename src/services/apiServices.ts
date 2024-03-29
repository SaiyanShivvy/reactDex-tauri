// apiService.ts
import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/";

export const getPokedex = async (limit: number): Promise<any> => {
	const url = `${BASE_URL}pokemon?limit=${limit}`;
	try {
		const response = await axios.get(url);
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

export const getGenerationData = async (name: string): Promise<any> => {
	const url = `${BASE_URL}machine/${name}`;
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.error("Error getting Machine data: ", error);
		throw error;
	}
};
