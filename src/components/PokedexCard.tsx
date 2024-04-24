import React, { useState, useEffect } from "react";
import PokemonDetails from "./PokemonDetails";
import { sanitizeInput } from "../utility/utility";
import { getPokedex } from "../services/apiServices";
import axios from "axios";

interface PokedexCardProps {
	name: string;
}

const PokedexCard: React.FC<PokedexCardProps> = ({ name }) => {
	const [modalStates, setModalStates] = useState({});
	const imageUrl = `https://img.pokemondb.net/sprites/home/normal/${name}.png`;
	const openModal = (modalName: any) => {
		setModalStates((prevState) => ({
			...prevState,
			[modalName]: true,
		}));
		document.getElementById(name + `_details_modal`)?.showModal();
	};

	const closeModal = (modalName: any) => {
		setModalStates((prevState) => ({
			...prevState,
			[modalName]: false,
		}));
	};

	if (!name && !imageUrl) return <div className='skeleton w-64 h-96'></div>;

	return (
		<div className='card bg-base-100 w-64 h-96 shadow-xl'>
			<figure>
				<img src={imageUrl} alt={name} className='rounded-xl' />
			</figure>
			<div className='card-body items-center text-center'>
				<h2 className='card-title'>{name.toLocaleUpperCase()}</h2>
				<div className='card-actions'>
					<button
						className='btn'
						onClick={() => {
							openModal(name + `_details_modal`);
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
								<PokemonDetails name={name} modalStates={modalStates} />
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
