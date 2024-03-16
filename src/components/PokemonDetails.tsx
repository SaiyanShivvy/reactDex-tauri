import React, { useEffect, useState } from "react";
import axios from "axios";

interface PokemonDetailsProps {
  url: string;
}

interface PokemonData {
  name: string;
  height: number;
  weight: number;
  // Add more properties as needed
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ url }) => {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(url);
        const data = response.data;
        setPokemonData({
          name: data.name,
          height: data.height,
          weight: data.weight,
          // Add more properties as needed
        });
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };

    fetchPokemonData();
  }, [url]);

  if (!pokemonData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>{pokemonData.name}</h3>
      <p>Height: {pokemonData.height} dm</p>
      <p>Weight: {pokemonData.weight} hg</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default PokemonDetails;
