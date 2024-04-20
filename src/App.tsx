import "./App.css";
import Footer from "./components/Footer";
import PokemonList from "./components/Pokedex";
import NavBar from "./components/Navbar";

function App() {
	return (
		<div className='App'>
			<NavBar />
			<div className='content-scrollable'>
				<div className='content'>
					<PokemonList />
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default App;
