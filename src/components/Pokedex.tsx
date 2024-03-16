import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "./PokedexCard";
import PokedexCard from "./PokedexCard";

function PokemonList(): any {
	const PokeAPI = "https://pokeapi.co/api/v2/pokemon?limit=16";
	let [pokedex, setPokedex] = useState([]);
	let [nextPage, setNextPage] = useState(null);
	let [prevPage, setPrevPage] = useState(null);

	function paginate() {}

	useEffect(() => {
		function getPokemon(url: string) {
			axios
				.get(url)
				.then((res) => {
					let data = res.data;
					setPokedex(data.results);
					if (data.next != null) {
						setNextPage(data.next);
					}
					if (data.previous != null) {
						setPrevPage(data.previous);
					}
					console.log(pokedex);
					console.log(prevPage);
					console.log(nextPage);
				})
				.catch((error) => console.error(error));
		}
		getPokemon(PokeAPI);
	}, []);

	if (!pokedex.length) return <h3>Loading...</h3>;

	return (
		<>
			<div>
				{pokedex.map((pokemon: any) => (
					<PokedexCard key={pokemon.name} pokemon={pokemon} />
				))}
			</div>
		</>
	);
}

export default PokemonList;
