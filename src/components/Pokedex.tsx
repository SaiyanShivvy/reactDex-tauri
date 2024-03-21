import React, { useEffect, useState } from "react";
import { getPokedex } from "../services/apiServices";
import PokedexCard from "./PokedexCard";

interface PokedexEntry {
  name: string;
  url: string;
}

const PokemonList: React.FC = (): JSX.Element => {
  const [pokedex, setPokedex] = useState<PokedexEntry[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);

  const fetchPokedex = async (limit: number) => {
    try {
      const data = await getPokedex(limit);
      setPokedex(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const paginate = (url: string | null) => {
    if (url) {
      fetchPokedex(16); // Adjust the limit as needed
    }
  };

  useEffect(() => {
    fetchPokedex(16); // Adjust the limit as needed
  }, []);

  if (!pokedex) return <h3>Loading...</h3>;

  return (
    <>
      <div className="flex flex-wrap justify-center">
        {pokedex.map((pokemon: any) => (
          <div
            key={pokemon.name}
            className="w-full p-4 sm:w-1/2 md:w-1/3 lg:w-1/4"
          >
            <PokedexCard name={pokemon.name} url={pokemon.url} />
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
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
