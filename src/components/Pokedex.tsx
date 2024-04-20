import React, { useEffect, useRef, useState } from "react";
import { getPokedex, getPokemonData } from "../services/apiServices";
import PokedexCard from "./PokedexCard";
import { Pokemon } from "../common/models/Pokemon/Pokemon";
import classNames from "classnames";

interface PokedexEntry {
	name: string;
	url: string;
}

const PokemonList: React.FC = (): JSX.Element => {
	const [pokedex, setPokedex] = useState<PokedexEntry[]>([]);
	const [searchSuggestions, setSearchSuggestions] = useState<PokedexEntry[]>(
		[]
	);
	const [nextPage, setNextPage] = useState<string | null>(null);
	const [prevPage, setPrevPage] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const ref = useRef<HTMLDivElement>(null);
	const [open, setOpen] = useState(false);

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

	const fetchSuggestions = async (url: string, limit: number) => {
		try {
			const data = await getPokedex(url, limit);
			setSearchSuggestions(data.results);
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
		fetchSuggestions("", 10000);
	}, []);

	const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setSearchQuery(value.toLowerCase());

		if (value.trim() == "") {
			fetchSuggestions("", 10000);
		}

		const filteredSuggestions = searchSuggestions
			.filter((pokemon: any) =>
				pokemon.name.toLowerCase().includes(searchQuery)
			)
			.sort();
		setSearchSuggestions(filteredSuggestions);
	};

	const handleSelectSuggestion = (suggestion: any) => {
		setSearchQuery(suggestion.name);
		setOpen(false);
		setSearchSuggestions([]);
	};

	if (!pokedex)
		return <span className='loading loading-infinity loading-lg'></span>;

	return (
		<>
			<div
				className={classNames({
					"dropdown w-full": true,
					"dropdown-open": open,
				})}
				ref={ref}>
				<label className='input input-bordered flex items-center gap-2'>
					<input
						type='text'
						className='input grow w-full'
						placeholder='Search Pokemon...'
						value={searchQuery}
						onChange={handleSearch}
					/>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 16 16'
						fill='currentColor'
						className='w-4 h-4 opacity-70'>
						<path
							fillRule='evenodd'
							d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'
							clipRule='evenodd'
						/>
					</svg>
				</label>
				<div className='dropdown-content z-[2] bg-base-200 top-14 max-h-96 overflow-auto flex-col rounded-md'>
					{searchSuggestions.length > 0 && (
						<ul
							className='menu menu-compact '
							style={{ width: ref.current?.clientWidth }}>
							{searchSuggestions.map((suggestion, index) => (
								<li
									key={index}
									tabIndex={index + 1}
									onClick={() => {
										handleSelectSuggestion(suggestion);
										setOpen(false);
									}}
									className='border-b border-b-base-content/10 w-full'>
									<button>{suggestion.name.toUpperCase()}</button>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>

			<div className='flex flex-wrap'>
				{searchQuery !== "" ? (
					<div key={searchQuery} className='w-1/4 p-4'>
						<PokedexCard name={searchQuery} />
					</div>
				) : (
					pokedex.map((pokemon: any) => (
						<div key={pokemon.name} className='w-1/4 p-4'>
							<PokedexCard name={pokemon.name} />
						</div>
					))
				)}
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
