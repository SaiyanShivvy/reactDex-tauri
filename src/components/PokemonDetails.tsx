import {
  calculateStatPercentage,
  convertUnits,
  getFormattedStats,
} from "../utility/utility";

interface Ability {
  name: string;
  url: string;
}

interface AbilityDetails {
  ability: Ability;
  is_hidden: boolean;
  slot: number;
}

interface Form {
  name: string;
  url: string;
}

interface GameIndex {
  game_index: number;
  version: {
    name: string;
    url: string;
  };
}

interface Stat {
  name: string;
  url: string;
}

interface StatDetails {
  base_stat: number;
  effort: number;
  stat: Stat;
}

interface Type {
  name: string;
  url: string;
}

interface TypeDetails {
  slot: number;
  type: Type;
}

interface PokemonDetails {
  abilities: AbilityDetails[];
  base_experience: number;
  cries: {
    latest: string;
    legacy: string;
  };
  forms: Form[];
  game_indices: GameIndex[];
  height: number;
  held_items: never[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: any[];
  name: string;
  order: number;
  past_abilities: never[];
  past_types: never[];
  species: {
    name: string;
    url: string;
  };
  sprites: Record<string, string>;
  stats: StatDetails[];
  types: TypeDetails[];
  weight: number;
}

interface PokemonDetailsProps {
  pokemon: PokemonDetails;
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ pokemon }) => {
  const formattedStats = getFormattedStats(pokemon.stats as StatDetails[]); // Cast pokemon.stats to StatDetails[]

  return (
    <div className="pokemon-details">
      <h2>{pokemon.name}</h2>
      <p>Base Experience: {pokemon.base_experience}</p>
      <p>Height: {convertUnits(pokemon.height)} m</p>
      <p>Weight: {convertUnits(pokemon.weight)} kg</p>
      <div className="abilities">
        <h3>Abilities:</h3>
        <ul>
          {pokemon.abilities.map((ability) => (
            <li key={ability.ability.name}>
              {ability.ability.name} (Slot: {ability.slot}, Hidden:{" "}
              {ability.is_hidden.toString()})
            </li>
          ))}
        </ul>
      </div>
      <div className="stats">
        <p>
          Stats:
          <br />
          {formattedStats}
        </p>
      </div>
      {/* Render other details as needed */}
    </div>
  );
};

export default PokemonDetails;
