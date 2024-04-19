import { useEffect, useState } from "react";
import { convertUnits } from "../utility/utility";
import { Pokemon, PokemonSpecies } from "../common/models/Pokemon/Pokemon";
import { getPokemonData, getPokemonSpeciesData } from "../services/apiServices";

interface PokedexCardProps {
	name: string;
	isModalOpen: boolean;
}

const PokemonDetails: React.FC<PokedexCardProps> = ({ name, isModalOpen }) => {
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

		fetchData();
	}, [isModalOpen, name]);

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
					<li key={index}>
						<li className='join-item'>
							{ability.ability.name.toLocaleUpperCase()}
							{ability.is_hidden ? <sub> (Hidden)</sub> : ""}
						</li>
					</li>
				))}
			</ul>
		</>
	);
};

export default PokemonDetails;
