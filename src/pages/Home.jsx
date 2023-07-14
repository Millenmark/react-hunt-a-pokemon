import PokemonList from "../components/PokemonList";
import Header from "../containers/Header";

const Home = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto pt-24">
        <PokemonList />
      </div>
    </>
  );
};

export default Home;
