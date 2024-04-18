import { useEffect, useRef, useState } from "react";
import { convertUnits } from "../utility/utility";
import { getPokemonData, getPokemonDetails } from "../services/apiServices";
import GenerationSelector from "../components/GenerationSelector";

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

interface Generation {
	name: string;
}

interface VersionGroup {
	name: string;
	generation_id: number;
	generation: Generation[];
}

interface Moves {
	move_id: number;
	level: number;
	move: Move[];
	learn_method: MoveLearnMethod[];
	game_version: VersionGroup[];
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
	const [pokemonMoves, setPokemonMoves] = useState<[] | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getPokemonData(name);
				const gpl_data = await getPokemonDetails(name);
				setPokemonData(data);
				setPokemonMoves(gpl_data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching details:", error);
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) {
		return <span className='loading loading-infinity loading-sm'></span>;
	}

	console.log(pokemonMoves);

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
					<p>Base Experience: {pokemonData!.base_experience}</p>
					<p>Height: {convertUnits(pokemonData!.height)} m</p>
					<p>Weight: {convertUnits(pokemonData!.weight)} kg</p>
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
					<h2>Move List</h2>
					<ul>
						{pokemonMoves.map((move: any) => (
							<li key={move.move_id}>
								<h3>{move.move.name}</h3>
								<p>Level: {move.level}</p>
								<p>Learn Method: {move.learn_method.name}</p>
								<p>Version Group: {move.game_version.name}</p>
								<p>Generation: {move.game_version.generation.name}</p>
								<p>Accuracy: {move.move.accuracy || "Unknown"}</p>
								<p>Power: {move.move.power || "Unknown"}</p>
								<p>PP: {move.move.pp}</p>
								<p>Priority: {move.move.priority}</p>
								<p>Effect: {move.move.move_effect.effect_text[0].effect}</p>
							</li>
						))}
					</ul>
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
