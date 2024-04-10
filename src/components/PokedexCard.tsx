import React, { useState, useEffect } from "react";
import { getPokemonData } from "../services/apiServices";
import PokemonDetails from "./PokemonDetails";
import { sanitizeInput } from "../utility/utility";

/*

TODO: 

- Remove the fetch from here only PokemonDetails is able to fetch data using graphql

*/

interface PokedexCardProps {
	name: string;
	url: string;
}

const PokedexCard: React.FC<PokedexCardProps> = ({ name }) => {
	if (!name) return <div className='skeleton w-64 h-96'></div>;

	return (
		<div className='card bg-base-100 w-64 h-96 shadow-xl'>
			<figure>
				<img
					src={`https://img.pokemondb.net/sprites/home/normal/${name}.png`}
					alt={name}
					className='rounded-xl'
				/>
			</figure>
			<div className='card-body items-center text-center'>
				<h2 className='card-title'>{name.toLocaleUpperCase()}</h2>
				<div className='card-actions'>
					<button
						className='btn'
						onClick={() =>
							document.getElementById(name + `_details_modal`)?.showModal()
						}>
						View Details
					</button>

					{
						<dialog
							id={name + `_details_modal`}
							className='modal modal-bottom sm:modal-middle'>
							<div className='modal-box'>
								<h1 className='font-bold text-lg'>{sanitizeInput(name)}</h1>
								<PokemonDetails name={name} />
								<div className='modal-action'>
									<form method='dialog'>
										{/* if there is a button in form, it will close the modal */}
										<button className='btn'>Close</button>
									</form>
								</div>
							</div>
						</dialog>
					}
				</div>
			</div>
		</div>
	);
};

export default PokedexCard;
