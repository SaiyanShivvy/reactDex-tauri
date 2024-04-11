import { useEffect, useRef, useState } from "react";
import { convertUnits, sanitizeInput } from "../utility/utility";
import { getPokemonData } from "../services/apiServices";
import GenerationSelector from "../components/GenerationSelector";

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

interface PokedexCardProps {
	name: string;
}

const PokemonDetails: React.FC<PokedexCardProps> = ({ name }) => {
	const [loading, setLoading] = useState<boolean>(true);
	const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getPokemonData(name);
				setPokemonData(data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching details:", error);
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading || !pokemonData) {
		return <span className='loading loading-infinity loading-sm'></span>;
	}

	return (
		<>
			<div role='tablist' className='tabs tabs-lifted'>
				<input
					type='radio'
					name='pokemon_tabs'
					role='tab'
					className='tab tab-active'
					aria-label='Details'
				/>
				<div
					role='tabpanel'
					className='tab-content bg-base-100 border-base-300 rounded-box p-6'>
					<p>Base Experience: {pokemonData.base_experience}</p>
					<p>Height: {convertUnits(pokemonData.height)} m</p>
					<p>Weight: {convertUnits(pokemonData.weight)} kg</p>
				</div>

				<input
					type='radio'
					name='pokemon_tabs'
					role='tab'
					className='tab'
					aria-label='Moves'
					checked
				/>
				<div
					role='tabpanel'
					className='tab-content bg-base-100 border-base-300 rounded-box p-6'>
					Tab content 2
				</div>

				<input
					type='radio'
					name='pokemon_tabs'
					role='tab'
					className='tab'
					aria-label='Locations'
				/>
				<div
					role='tabpanel'
					className='tab-content bg-base-100 border-base-300 rounded-box p-6'>
					Tab content 3
				</div>
			</div>
		</>
	);
};

export default PokemonDetails;
