import { useEffect, useState } from "react";
import { convertUnits, sanitizeInput } from "../utility/utility";
import { Pokemon, PokemonSpecies } from "../common/models/Pokemon/Pokemon";
import { getPokemonData, getPokemonSpeciesData } from "../services/apiServices";

interface PokedexCardProps {
	name: string;
	modalStates: any;
}

const PokemonDetails: React.FC<PokedexCardProps> = ({ name, modalStates }) => {
	const [loading, setLoading] = useState<boolean>(true);
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
				setLoading(false);
			} catch (error) {
				console.error("Error fetching details:", error);
				setLoading(false);
			}
		};

		console.log("Fetch: ", modalStates[name + `_details_modal`]);
		if (modalStates[name + `_details_modal`]) {
			fetchData();
		}
	}, [modalStates, name]);

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
		</>
	);
};

export default PokemonDetails;
