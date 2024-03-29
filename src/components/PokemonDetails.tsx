import { useEffect, useMemo, useState } from "react";
import {
	convertUnits,
	getFormattedStats,
	sanitizeInput,
} from "../utility/utility";
import {
	getPokemonEggGroup,
	getPokemonEvolutionChain,
	getPokemonLocations,
	getPokemonSpeciesData,
	getPokemonTypes,
} from "../services/apiServices";

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
	const [eggGroups, setEggGroups] = useState<any | null>(null);
	const [evolutionChain, setEvolutionChain] = useState<any | null>(null);
	const [pokemonTypes, setPokemonTypes] = useState<any | null>(null);
	const [pokemonSpecies, setPokemonSpecies] = useState<any | null>(null);
	const [pokemonLocations, setPokemonLocations] = useState<any | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const handleVersionSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedVersion(event.target.value);
	};

	// Filter moves based on selected game version
	const filteredMoves = selectedVersion
		? pokemon.moves.filter((move) =>
				move.version_group_details.some((detail) =>
					detail.version_group.name.startsWith(selectedVersion)
				)
		  )
		: pokemon.moves;

	// Remove duplicate version group names
	const uniqueVersionGroups = Array.from(
		new Set(
			pokemon.moves.flatMap((move) =>
				move.version_group_details.map((detail) => detail.version_group.name)
			)
		)
	);

	useEffect(() => {
		const fetchRest = async () => {
			try {
				if (pokemon.id !== undefined) {
					const egg = await getPokemonEggGroup(pokemon.id);
					const evoChain = await getPokemonEvolutionChain(pokemon.id);
					const encounterLoc = await getPokemonLocations(pokemon.id);
					const species = await getPokemonSpeciesData(pokemon.id);
					const pType = await getPokemonTypes(pokemon.id);
					setEggGroups(egg);
					setEvolutionChain(evoChain);
					setPokemonSpecies(species);
					setPokemonTypes(pType);
					setPokemonLocations(encounterLoc);
					setLoading(false); // Set loading to false after data is fetched
				}
			} catch (error) {
				console.error("Error fetching details:", error);
				setLoading(false); // Set loading to false in case of error
			}
		};

		if (pokemon.id !== undefined) {
			fetchRest();
		}
	}, [pokemon?.id]);

	const renderEvolution = (chain: any) => {
		if (!chain || !chain.species) {
			return <div>No evolution data available</div>;
		}

		return (
			<div key={chain.species.name}>
				<div>Name: {chain.species.name}</div>
				<div>URL: {chain.species.url}</div>
				{chain.evolves_to.length > 0 && (
					<div>
						<strong>Evolves To:</strong>
						<ul>
							{chain.evolves_to.map((evolvesTo: any) => (
								<li key={evolvesTo.species.name}>
									<div>Name: {evolvesTo.species.name}</div>
									<div>URL: {evolvesTo.species.url}</div>
									{renderEvolution(evolvesTo)}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		);
	};

	// console.log(pokemon.id, pokemon.name);
	// console.log(eggGroups);
	// console.log(evolutionChain);
	// console.log(pokemonSpecies);
	// console.log(pokemonTypes);
	// console.log(pokemonLocations);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className='pokemon-details'>
			<h2>{pokemon.name}</h2>
			{/* Selector for game version */}
			<label htmlFor='version'>Select Version:</label>
			<select
				id='version'
				value={selectedVersion}
				onChange={handleVersionSelect}>
				<option value=''>All Versions</option>
				{uniqueVersionGroups.map((versionGroup) => (
					<option key={versionGroup} value={versionGroup}>
						{versionGroup}
					</option>
				))}
			</select>
			<p>Base Experience: {pokemon.base_experience}</p>
			<p>Height: {convertUnits(pokemon.height)} m</p>
			<p>Weight: {convertUnits(pokemon.weight)} kg</p>
			<div className='abilities'>
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
			<div className='moves'>
				<h3>Moves:</h3>
				{/* Display filtered moves */}
				<ul>
					{filteredMoves.map((move) => (
						<li key={move.type?.name}>
							{move.type?.name}
							<ul>
								{move.version_group_details.map((detail) => (
									<li
										key={`${detail.move_learn_method.name}-${detail.level_learned_at}-${detail.version_group.name}`}>
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
			<div className='evolution'>
				<h3>Evolution Chain:</h3>
				{renderEvolution(evolutionChain.chain)}
			</div>
			{/* Render other details as needed */}
		</div>
	);
};

export default PokemonDetails;
