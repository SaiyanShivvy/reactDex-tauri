import React, { useState, useEffect } from "react";
import { getPokemonData } from "../services/apiServices";
import PokemonDetails from "./PokemonDetails";
import { sanitizeInput } from "../utility/utility";

interface PokedexCardProps {
	name: string;
	url: string;
}

const PokedexCard: React.FC<PokedexCardProps> = ({ name }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
		document.getElementById(name + `_details_modal`)?.showModal();
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

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
						onClick={() => {
							openModal();
						}}>
						View Details
					</button>

					{
						<dialog
							id={name + `_details_modal`}
							className='modal modal-bottom lg:modal-middle'>
							<div className='modal-box w-5xl'>
								<h1 className='font-bold text-lg'>
									{sanitizeInput(name).toLocaleUpperCase()}
								</h1>
								<PokemonDetails name={name} isModalOpen={isModalOpen} />
								<div className='modal-action'>
									<form method='dialog'>
										<button className='btn' onClick={closeModal}>
											Close
										</button>
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
