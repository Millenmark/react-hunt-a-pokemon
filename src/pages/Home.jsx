import PokemonList from "../components/PokemonList";
import Header from "../containers/Header";

const Home = () => {
  return (
    <div className="container mx-auto">
      <Header />
      <PokemonList />
    </div>
  );
};

export default Home;
