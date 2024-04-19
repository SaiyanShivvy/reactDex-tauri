import React, { useEffect, useState } from "react";
import { getPokedex } from "../services/apiServices";
import PokedexCard from "./PokedexCard";

interface PokedexEntry {
	name: string;
	url: string;
}

const PokemonList: React.FC = (): JSX.Element => {
	const [pokedex, setPokedex] = useState<PokedexEntry[]>([]);
	const [nextPage, setNextPage] = useState<string | null>(null);
	const [prevPage, setPrevPage] = useState<string | null>(null);

	const fetchPokedex = async (url: string, limit: number) => {
		try {
			const data = await getPokedex(url, limit);
			setPokedex(data.results);
			setNextPage(data.next);
			setPrevPage(data.previous);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const paginate = (url: any) => {
		if (url) {
			fetchPokedex(url, 12);
		}
	};

	useEffect(() => {
		fetchPokedex("", 12);
	}, []);

	if (!pokedex)
		return <span className='loading loading-infinity loading-lg'></span>;

	return (
		<>
			<div className='flex flex-wrap'>
				{pokedex.map((pokemon: any) => (
					<div key={pokemon.name} className='w-1/4 p-4'>
						<PokedexCard name={pokemon.name} url={pokemon.url} />
					</div>
				))}
			</div>
			<div className='join grid grid-cols-2'>
				<button
					className='join-item btn btn-outline'
					onClick={() => paginate(prevPage)}
					disabled={!prevPage}>
					Previous page
				</button>
				<button
					className='join-item btn btn-outline'
					onClick={() => paginate(nextPage)}
					disabled={!nextPage}>
					Next
				</button>
			</div>
		</>
	);
};

export default PokemonList;
