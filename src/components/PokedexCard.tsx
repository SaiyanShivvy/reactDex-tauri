import React, { useState, useEffect } from "react";
import { getPokemonData } from "../services/apiServices";
import PokemonDetails from "./PokemonDetails";

/*

TODO: 

- Remove the fetch from here only PokemonDetails is able to fetch data using graphql

*/

interface PokedexCardProps {
	name: string;
	url: string;
}

const PokedexCard: React.FC<PokedexCardProps> = ({ name, url }) => {
	const [pokemonDetails, setPokemonDetails] = useState<any | null>(null);
	const [showModal, setShowModal] = useState(false);

	const handleShowModal = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	useEffect(() => {
		const fetchPokemonDetails = async () => {
			try {
				const response = await getPokemonData(name);
				setPokemonDetails(response);
			} catch (error) {
				console.error("Error fetching Pokemon details:", error);
			}
		};

		fetchPokemonDetails();
	}, [url]);

	if (!pokemonDetails) return <div>Loading Pokemon details...</div>;

	return (
		<div className='card bg-base-100 w-96 shadow-xl'>
			<figure className='px-10 pt-10'>
				<img
					src={`https://img.pokemondb.net/sprites/home/normal/${name}.png`}
					alt={name}
					className='rounded-xl'
				/>
			</figure>
			<div className='card-body items-center text-center'>
				<h2 className='card-title'>{name}</h2>
				<div className='card-actions'>
					<button className='btn' onClick={handleShowModal}>
						View Details
					</button>
					{showModal && (
						<div className='fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center'>
							<div className='absolute left-0 top-0 h-full w-full bg-black opacity-50'></div>
							<div className='modal bg-base-100 z-50 rounded-lg p-6'>
								<button
									className='btn close-btn absolute right-4 top-4'
									onClick={handleCloseModal}>
									Close
								</button>
								<PokemonDetails pokemon={pokemonDetails} />
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default PokedexCard;
