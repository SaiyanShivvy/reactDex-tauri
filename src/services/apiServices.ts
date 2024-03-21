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
