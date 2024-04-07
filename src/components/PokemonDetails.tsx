import { useEffect, useState } from "react";
import { convertUnits, sanitizeInput } from "../utility/utility";
import { getGameData } from "../services/apiServices";

/*
TODO:

- Move out Generation handling from here to PokedexCard? tbh Genration selector is only for Moves. 
	- Display the Games + Generation Name
	- Display a tabed table for each game/ game groups

- Test the GraphQL fetch for pokemon data.
- The evolution chain will probably be the hard and it might be easier to fetch the data using the chain url
and rest api
*/

interface Ability {
	name: string;
}
interface Abilities {
	ability: Ability;
	is_hidden: boolean;
}

interface Type {
	name: string;
}

interface Types {
	type: Type;
	slot: number;
}

interface Stat {
	name: string;
}

interface Stats {
	stat: Stat;
	base_stat: number;
	effort: number;
	id: number;
}

interface MoveType {
	name: string;
}

interface MoveText {
	effect: string;
	short_effect: string;
}
interface MoveEffect {
	moveEffectText: MoveText[];
}

interface Move {
	name: string;
	accuracy: number | null;
	move_effect_chance: number | null;
	power: number | null;
	pp: number | null;
	priority: number;
	move_type: MoveType[];
	move_effect: MoveEffect | null;
}

interface MoveLearnMethod {
	name: string;
}

interface VersionGroup {
	name: string;
	generation_id: number;
}

interface Moves {
	id: number;
	level: number;
	move: Move[];
	move_learn_method: MoveLearnMethod[];
	version_group: VersionGroup[];
}
interface Pokemon {
	id: number;
	name: string;
	base_experience: number;
	height: number;
	weight: number;
	abilities: Abilities[];
	types: Types[];
	stats: Stats[];
	moves: Moves[];
}

interface PokemonDetailsProps {
	pokemon: Pokemon;
}

interface Games {
	game_id: number;
	game_name: string;
}

interface GameVersions {
	group_id: number;
	game_version: Games[];
}

interface PokemonGeneration {
	gen_name: string;
	gen_id: number;
	game_versions: GameVersions[];
}

interface GenerationInfo {
	generation: PokemonGeneration[];
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ pokemon }) => {
	const [loading, setLoading] = useState<boolean>(true);
	const [gameData, setGameData] = useState<GenerationInfo | null>(null);
	const [selectedGeneration, setSelectedGeneration] =
		useState<PokemonGeneration | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(false);
			} catch (error) {
				console.error("Error fetching details:", error);
				setLoading(false);
			}
		};

		fetchData();
	}, [pokemon.id]);

	useEffect(() => {
		const fetchGameData = async () => {
			try {
				const data = await getGameData();
				setGameData(data.data);
			} catch (error) {
				console.error("Error fetching Game Information:", error);
			}
		};
		fetchGameData();
	}, []);

	const handleGenerationChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		const selectedId = parseInt(event.target.value);
		const generation = gameData?.generation.find(
			(gen) => gen.gen_id === selectedId
		);
		setSelectedGeneration(generation || null);
	};

	if (loading || !gameData) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<div className='pokemon-details'>
				<p>Base Experience: {pokemon.base_experience}</p>
				<p>Height: {convertUnits(pokemon.height)} m</p>
				<p>Weight: {convertUnits(pokemon.weight)} kg</p>
			</div>
			<div>
				<label htmlFor='generation'>Select Generation:</label>
				<select id='generation' onChange={handleGenerationChange}>
					<option value=''>-- Select Generation --</option>
					{gameData.generation.map((gen) => (
						<option key={gen.gen_id} value={gen.gen_id}>
							{sanitizeInput(gen.gen_name)}
						</option>
					))}
				</select>

				{selectedGeneration && selectedGeneration.game_versions && (
					<div>
						<ul>
							{selectedGeneration.game_versions.map((group) => (
								<li key={group.group_id}>
									<span>
										{group.game_version &&
											group.game_version.map((game) => (
												<li key={game.game_id}>
													{sanitizeInput(game.game_name)}
												</li>
											))}
									</span>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</>
	);
};

export default PokemonDetails;
