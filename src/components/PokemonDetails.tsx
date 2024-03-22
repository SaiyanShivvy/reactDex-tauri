import { useState } from "react";
import {
  convertUnits,
  getFormattedStats,
  sanitizeInput,
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

interface MoveType {
  name: string;
  url: string;
}

interface VersionGroupDetails {
  level_learned_at: number;
  move_learn_method: MoveType;
  version_group: MoveType;
}

interface Move {
  slot: number;
  type?: MoveType;
  version_group_details: VersionGroupDetails[];
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
  moves: Move[];
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
  const [selectedVersion, setSelectedVersion] = useState<string>("");

  const handleVersionSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVersion(event.target.value);
  };

  // Filter moves based on selected game version
  const filteredMoves = selectedVersion
    ? pokemon.moves.filter((move) =>
        move.version_group_details.some((detail) =>
          detail.version_group.name.startsWith(selectedVersion),
        ),
      )
    : pokemon.moves;

  // Remove duplicate version group names
  const uniqueVersionGroups = Array.from(
    new Set(
      pokemon.moves.flatMap((move) =>
        move.version_group_details.map((detail) => detail.version_group.name),
      ),
    ),
  );

  console.log(filteredMoves);

  return (
    <div className="pokemon-details">
      <h2>{pokemon.name}</h2>
      {/* Selector for game version */}
      <label htmlFor="version">Select Version:</label>
      <select
        id="version"
        value={selectedVersion}
        onChange={handleVersionSelect}
      >
        <option value="">All Versions</option>
        {uniqueVersionGroups.map((versionGroup) => (
          <option key={versionGroup} value={versionGroup}>
            {versionGroup}
          </option>
        ))}
      </select>
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
      <div>
        <p>
          Stats:
          <br />
          {getFormattedStats(pokemon.stats as StatDetails[])}
        </p>
      </div>
      <div className="moves">
        <h3>Moves:</h3>
        {/* Display filtered moves */}
        <ul>
          {filteredMoves.map((move) => (
            <li key={move.type?.name}>
              {move.type?.name}
              <ul>
                {move.version_group_details.map((detail) => (
                  <li
                    key={`${detail.move_learn_method.name}-${detail.level_learned_at}-${detail.version_group.name}`}
                  >
                    Learned at Level {detail.level_learned_at} via{" "}
                    {detail.move_learn_method.name} in{" "}
                    {detail.version_group.name}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      {/* Render other details as needed */}
    </div>
  );
};

export default PokemonDetails;
