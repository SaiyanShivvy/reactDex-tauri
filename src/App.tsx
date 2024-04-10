import "./App.css";
import PokemonList from "./components/Pokedex";
import NavBar from "./components/navbar";

function App() {
	return (
		<div className='App'>
			<NavBar />
			<PokemonList />
		</div>
	);
}

export default App;
