import { useEffect, useState } from "react";
import { convertUnits, sanitizeInput } from "../utility/utility";
import { Pokemon, PokemonSpecies } from "../common/models/Pokemon/Pokemon";
import {
	getMoveData,
	getPokemonData,
	getPokemonEvolutionChain,
	getPokemonSpeciesData,
} from "../services/apiServices";

interface EvolutionDetails {
	gender: any;
	held_item: any;
	item: any;
	known_move: any;
	known_move_type: any;
	location: any;
	min_affection: any;
	min_beauty: any;
	min_happiness: any;
	min_level: number;
	needs_overworld_rain: boolean;
	party_species: any;
	party_type: any;
	relative_physical_stats: any;
	time_of_day: string;
	trade_species: any;
	trigger: {
		name: string;
		url: string;
	};
	turn_upside_down: boolean;
}

interface EvolutionChain {
	baby_trigger_item: any;
	chain: {
		evolution_details: EvolutionDetails[];
		evolves_to: EvolutionChain[];
		is_baby: boolean;
		species: {
			name: string;
			url: string;
		};
	};
	id: number;
}

interface PokedexCardProps {
	name: string;
	modalStates: any;
}

const PokemonDetails: React.FC<PokedexCardProps> = ({ name, modalStates }) => {
	const [loading, setLoading] = useState<boolean>(true);
	const [gameVersion, setGameVersion] = useState<any[]>([]);
	const [moveList, setMoveList] = useState<any[]>([]);
	const [filteredMoveList, setFilteredMoveList] = useState<any[]>([]);
	const [selectedVersion, setSelectedVersion] = useState(gameVersion[0]);
	const [learnMethods, setLearnMethods] = useState<string[]>([]);
	const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);
	const [pokemonSpeciesData, setPokemonSpeciesData] =
		useState<PokemonSpecies | null>(null);
	const [evolutionChain, setEvolutionChain] = useState<string[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const pokemon = await getPokemonData(name);
				setPokemonData(pokemon);
				const pokemonSpecies = await getPokemonSpeciesData(pokemon.species.url);
				setPokemonSpeciesData(pokemonSpecies);
				const uniqueVersionGroups = new Set();
				const movePromises = pokemon.moves.map(async (move: any) => {
					const moveData = await getMoveData(move.move.url);
					const moveDetails = move.version_group_details.map((detail: any) => ({
						gameVersion: detail.version_group.name,
						levelLearnt: detail.level_learned_at,
						learnMethod: detail.move_learn_method.name,
					}));
					moveDetails.forEach((detail: any) => {
						uniqueVersionGroups.add(detail.gameVersion);
					});
					return {
						moveName: move.move.name,
						moveData: moveData,
						moveDetails: moveDetails,
					};
				});
				const moveResults = await Promise.all(movePromises);
				setMoveList(moveResults);
				setGameVersion(Array.from(uniqueVersionGroups));
				const evolutions = await getPokemonEvolutionChain(
					pokemonSpecies.evolution_chain.url
				);
				const formattedEvolutionChain = formatEvolutionChain(evolutions);
				setEvolutionChain(formattedEvolutionChain);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching details:", error);
				setLoading(false);
			}
		};

		if (modalStates[name + `_details_modal`]) {
			fetchData();
		}
	}, [modalStates, name]);

	const handleGameVersionChange = (event: any) => {
		const selectedVersion = event.target.value;
		setSelectedVersion(selectedVersion);
		filterMoveList(selectedVersion);
	};

	const filterMoveList = (gameVersion: string) => {
		console.log(moveList);
		const filteredList = moveList.map((move) => ({
			...move,
			moveDetails: move.moveDetails.filter(
				(detail: any) => detail.gameVersion === gameVersion
			),
		}));
		setFilteredMoveList(filteredList);
		const uniqueLearnMethods = [
			...new Set(
				filteredList.flatMap((move) =>
					move.moveDetails.map((detail: any) => detail.learnMethod)
				)
			),
		];
		setLearnMethods(uniqueLearnMethods);
	};

	const getSpriteUrl = (selectedVersion: string, type: string) => {
		const versions = pokemonData?.sprites?.versions;

		if (versions) {
			for (const generation in versions) {
				const versionData = versions[generation][selectedVersion];
				if (versionData && versionData[type]) {
					return versionData[type];
				}
			}
		}

		return "No sprite available";
	};

	const formatEvolutionChain = (evolve: EvolutionChain): string[] => {
		if (!evolve || !evolve.chain || !evolve.chain.evolves_to) return []; // Check if evolve or necessary properties are undefined or null

		const { evolves_to } = evolve.chain;
		const result: string[] = [];

		console.log(evolves_to, result);

		evolves_to.forEach((path: any) => {
			if (path.species && path.species.name) {
				path.evolution_details.forEach((detail: any) => {
					let evolutionString = "";
					if (detail.trigger.name === "use-item" && detail.item) {
						evolutionString = `Evolves to: ${path.species.name} via ${detail.trigger.name} using ${detail.item.name}`;
					} else if (
						detail.trigger.name === "level-up" &&
						detail.min_level === null
					) {
						if (detail.min_happiness >= 160 && detail.time_of_day) {
							evolutionString = `Evolves to: ${path.species.name} via ${detail.trigger.name} during ${detail.time_of_day} with High Happiness`;
						} else if (
							detail.min_happiness === null &&
							detail.time_of_day &&
							detail.location &&
							detail.location.name
						) {
							evolutionString = `Evolves to: ${path.species.name} via ${detail.trigger.name} at ${detail.location.name}`;
						} else if (detail.min_happiness >= 160 && detail.known_move_type) {
							evolutionString = `Evolves to: ${path.species.name} via ${detail.trigger.name} knowing a ${detail.known_move_type.name} with High Happiness`;
						} else if (
							detail.min_happiness === null &&
							detail.known_move_type &&
							detail.min_affection !== null &&
							detail.time_of_day === ""
						) {
							evolutionString = `Evolves to: ${path.species.name} via ${detail.trigger.name} during ${detail.time_of_day} with High Happiness`;
						} else if (
							detail.min_happiness === null &&
							detail.known_move_type &&
							detail.min_affection === null &&
							detail.time_of_day === ""
						) {
							evolutionString = `Evolves to: ${path.species.name} via ${detail.trigger.name} during ${detail.time_of_day}`;
						}
					} else if (
						detail.trigger.name === "level-up" &&
						detail.min_level !== null
					) {
						evolutionString = `Evolves to: ${path.species.name} via ${detail.trigger.name} at Level: ${detail.min_level}`;
					}
					if (evolutionString) result.push(evolutionString);
					else result.push("Does not Evolve"); // Add non-empty evolution strings to the result array
				});
			}
		});

		console.log(result);
		return result;
	};

	if (loading) {
		return <span className='loading loading-infinity loading-sm'></span>;
	}

	return (
		<>
			<div className='divider'>DETAILS</div>
			<div className='divider divider-horizontal'></div>
			<div className='flex w-full justify-evenly join'>
				<div>
					<p>ID: {pokemonData!.id}</p>
					<p>Base Experience: {pokemonData!.base_experience}</p>
					<p>Height: {convertUnits(pokemonData!.height)} m</p>
					<p>Weight: {convertUnits(pokemonData!.weight)} kg</p>
					<ul>
						<span>Abilities:</span>
						{pokemonData!.abilities.map((ability, index) => (
							<ul key={index}>
								<li className='join-item'>
									{sanitizeInput(ability.ability.name).toLocaleUpperCase()}
									{ability.is_hidden ? <sub> (Hidden)</sub> : ""}
								</li>
							</ul>
						))}
					</ul>
				</div>
				<div className='divider divider-horizontal'></div>
				<div>
					<table>
						<thead>
							<tr>
								<th>Stat</th>
								<th>Value</th>
							</tr>
						</thead>
						<tbody>
							{pokemonData?.stats.map((stat) => (
								<tr key={stat.stat.name}>
									<td style={{ textAlign: "left" }}>
										{sanitizeInput(stat.stat.name.toLocaleUpperCase())}
									</td>
									<td>{stat.base_stat}</td>
								</tr>
							))}
						</tbody>
					</table>
					<br />
					{pokemonData!.stats.find((stat) => stat.effort > 0) && (
						<div>
							EV Yield:{" "}
							{pokemonData!.stats.find((stat) => stat.effort > 0).effort}{" "}
							{sanitizeInput(
								pokemonData!.stats
									.find((stat) => stat.effort > 0)
									.stat.name.toLocaleUpperCase()
							)}
						</div>
					)}
				</div>
				<div className='divider divider-horizontal'></div>
				<div>
					<p>Growth Rate: {pokemonSpeciesData!.growth_rate.name}</p>
					<p>
						{pokemonSpeciesData?.egg_groups.map((group) => (
							<span>{group.name}</span>
						))}
					</p>
					<ul>
						{pokemonSpeciesData?.pokedex_numbers.map((pokedex) => (
							<li>
								{sanitizeInput(pokedex.pokedex.name)}: {pokedex.entry_number}
							</li>
						))}
					</ul>
					{/* <p>
						{pokemonSpeciesData?.flavor_text_entries.find((flavor) =>
							flavor.version.name.includes(selectedVersion)
						)?.flavor_text ?? ""}
					</p> */}
				</div>
			</div>
			<div className='divider'>SPRITES</div>
			<div>
				{selectedVersion && (
					<div>
						<div className='flex flex-row flex-1'>
							<img
								src={getSpriteUrl(selectedVersion, "front_default")}
								alt='Front Default'
							/>
							<img
								src={getSpriteUrl(selectedVersion, "back_default")}
								alt='Back Default'
							/>
							<img
								src={getSpriteUrl(selectedVersion, "front_shiny_default")}
								alt='Front Shiny'
							/>
							<img
								src={getSpriteUrl(selectedVersion, "back_shiny_default")}
								alt='Back Shiny'
							/>
						</div>
						{getSpriteUrl(selectedVersion, "front_transparent") ===
							"No sprite available" && <div>No sprites available</div>}
					</div>
				)}
			</div>
			<div className='divider'>EVOLUTIONS</div>
			<div>
				<h2>Evolutions:</h2>
				<ul>
					{evolutionChain.map((evolution, index) => (
						<li key={index}>{evolution}</li>
					))}
				</ul>
			</div>
			<div className='divider'>MOVES</div>
			<div>
				<label htmlFor='gameVersion'>Select Game Version:</label>
				<select
					id='gameVersion'
					value={selectedVersion}
					aria-placeholder='------------'
					onChange={handleGameVersionChange}
					className='select select-ghost w-full max-w-xs'>
					{gameVersion!.map((version) => (
						<option key={version} value={version}>
							{sanitizeInput(version.toLocaleUpperCase())}
						</option>
					))}
				</select>
				<div className='overflow-x-auto'>
					{learnMethods.map((method) => (
						<div key={method}>
							<div className='divider divider-start'>
								{method.toLocaleUpperCase()}
							</div>
							<table className='table sm:table-xs'>
								<thead>
									<tr>
										<th>Level Learnt</th>
										<th>Move Name</th>
										<th>Move Type</th>
										<th>Move Category</th>
										<th>Power Points</th>
										<th>Move Power</th>
										<th>Move Accuracy</th>
										<th>Effect</th>
									</tr>
								</thead>
								<tbody style={{ maxHeight: "200px", overflowY: "scroll" }}>
									{filteredMoveList.map((move, index) => {
										const relevantDetails = move.moveDetails.filter(
											(detail: any) => detail.learnMethod === method
										);
										return relevantDetails.map(
											(detail: any, detailIndex: number) => (
												<tr key={`${index}-${detailIndex}`}>
													<td>{detail.levelLearnt}</td>
													<td>
														{sanitizeInput(move.moveName.toLocaleUpperCase())}
													</td>
													<td>{move.moveData.type.name.toLocaleUpperCase()}</td>
													<td>
														{move.moveData.damage_class.name.toLocaleUpperCase()}
													</td>
													<td>{move.moveData.pp}</td>
													<td>{move.moveData.power}</td>
													<td>{move.moveData.accuracy}</td>
													<td>
														{move.moveData.effect_entries.length > 0
															? move.moveData.effect_entries[0].short_effect
															: "No Effect Description"}
													</td>
												</tr>
											)
										);
									})}
								</tbody>
							</table>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default PokemonDetails;
