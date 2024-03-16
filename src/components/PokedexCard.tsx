import React from "react";
import PokemonDetails from "./PokemonDetails";

interface Pokemon {
  name: string;
  url: string;
}

interface PokedexCardProps {
  pokemon: Pokemon;
}

const PokedexCard: React.FC<PokedexCardProps> = ({ pokemon }) => {
  const handleShowModal = () => {
    const modal = document.getElementById("detailsModal") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img
          src={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`}
          alt={pokemon.name}
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{pokemon.name}</h2>
        <div className="card-actions">
          <button className="btn" onClick={handleShowModal}>
            View Entry
          </button>
          <dialog id="detailsModal" className="modal">
            <div className="modal-box">
				<PokemonDetails url={pokemon.url}/>
              <p className="py-4">
                Press ESC key or click the button below to close
              </p>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default PokedexCard;
