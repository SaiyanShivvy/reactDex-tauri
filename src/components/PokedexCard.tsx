export default function PokedexCard(pokemon: any) {
	let name = pokemon.pokemon.name;
	let url = pokemon.pokemon.url;
	console.log(pokemon);
	return (
		<>
			<div className='card w-96 bg-base-100 shadow-xl'>
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
						<button className='btn btn-primary'>View Entry</button>
					</div>
				</div>
			</div>
		</>
	);
}
