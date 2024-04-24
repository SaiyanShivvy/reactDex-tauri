import { useEffect, useState } from "react";
import { convertUnits, sanitizeInput } from "../utility/utility";
import { Pokemon, PokemonSpecies } from "../common/models/Pokemon/Pokemon";
import {
	getMoveData,
	getPokemonData,
	getPokemonSpeciesData,
} from "../services/apiServices";

interface PokedexCardProps {
	name: string;
	modalStates: any;
}

const PokemonDetails: React.FC<PokedexCardProps> = ({ name, modalStates }) => {
	const [loading, setLoading] = useState<boolean>(true);
	const [moveGameVersion, setMoveGameVersion] = useState<any[]>([]);
	const [moveList, setMoveList] = useState<any[]>([]);
	const [filteredMoveList, setFilteredMoveList] = useState<any[]>([]);
	const [selectedMoveGameVersion, setSelectedMoveGameVersion] = useState("");
	const [learnMethods, setLearnMethods] = useState<string[]>([]);
	const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);
	const [pokemonSpeciesData, setPokemonSpeciesData] =
		useState<PokemonSpecies | null>(null);

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
				setMoveGameVersion(Array.from(uniqueVersionGroups));
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
		console.log(selectedVersion);
		setSelectedMoveGameVersion(selectedVersion);
		filterMoveList(selectedVersion);
	};

	const filterMoveList = (gameVersion: string) => {
		console.log("start filtering");
		const filteredList = moveList.map((move) => ({
			...move,
			moveDetails: move.moveDetails.filter(
				(detail: any) => detail.gameVersion === gameVersion
			),
		}));
		console.log("filtered list", filteredList);
		setFilteredMoveList(filteredList);
		const uniqueLearnMethods = [
			...new Set(
				filteredList.flatMap((move) =>
					move.moveDetails.map((detail: any) => detail.learnMethod)
				)
			),
		];
		setLearnMethods(uniqueLearnMethods);
		console.log("filterlist", filteredList, "learnmethods", uniqueLearnMethods);
	};

	if (loading) {
		return <span className='loading loading-infinity loading-sm'></span>;
	}

	return (
		<>
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
			<div>
				<label htmlFor='gameVersion'>Select Game Version:</label>
				<select
					id='gameVersion'
					value={selectedMoveGameVersion}
					aria-placeholder='------------'
					onChange={handleGameVersionChange}>
					{moveGameVersion!.map((version) => (
						<option key={version} value={version}>
							{sanitizeInput(version.toLocaleUpperCase())}
						</option>
					))}
				</select>
				<div style={{ display: "flex", gap: "20px" }}>
					{learnMethods.map((method) => (
						<div key={method}>
							<h2>{method}</h2>
							<table>
								<thead>
									<tr>
										<th>Move Name</th>
										<th>Game Version</th>
										<th>Level Learnt</th>
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
													<td>
														{sanitizeInput(move.moveName.toLocaleUpperCase())}
													</td>
													<td>{detail.gameVersion}</td>
													<td>{detail.levelLearnt}</td>
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
