import "./App.css";
import Footer from "./components/Footer";
import PokemonList from "./components/Pokedex";
import NavBar from "./components/Navbar";

/*
TODO: Remove global scrollbar and have a hidden scrollbar inside the pokemon list component.
TODO: Remove Debounce
*/

function App() {
	return (
		<div className='App'>
			<NavBar />
			<div className='content'>
				<PokemonList />
			</div>
			<Footer />
		</div>
	);
}

export default App;
