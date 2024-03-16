import React, { useEffect, useState } from "react";
import { getPokemonList } from "../services/apiServices";
import PokedexCard from "./PokedexCard";

const PokemonList: React.FC = (): JSX.Element => {
  let [pokedex, setPokedex] = useState<any[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);

  const fetchPokemonData = async (limit: number) => {
    try {
      const data = await getPokemonList(limit);
      setPokedex(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
  };

  const paginate = (url: string | null) => {
    if (url) {
      fetchPokemonData(16); // Adjust the limit as needed
    }
  };

  useEffect(() => {
    fetchPokemonData(16); // Adjust the limit as needed
  }, []);

  if (!pokedex.length) return <h3>Loading...</h3>;

  return (
    <>
      <div className="flex flex-wrap justify-center">
        {pokedex.map((pokemon: any) => (
          <div key={pokemon.name} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
            <PokedexCard pokemon={pokemon} />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button onClick={() => paginate(prevPage)} disabled={!prevPage}>
          Previous
        </button>
        <button onClick={() => paginate(nextPage)} disabled={!nextPage}>
          Next
        </button>
      </div>
    </>
  );
};

export default PokemonList;
