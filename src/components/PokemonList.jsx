import axios from "axios";
import { useState, useEffect } from "react";
import { FiEdit3 } from "react-icons/fi";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=99"
        );
        setPokemons(response.data.results);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(pokemons);

  return (
    <div>
      <ul className="grid grid-cols-5 gap-4 place-items-center">
        {pokemons.map((pokemon, index) => (
          <li key={index}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                index + 1
              }.png`}
              alt={pokemon.name}
            />
            <p className="text-center capitalize flex justify-center items-center gap-2">
              {pokemon.name}
              <button type="button">
                <FiEdit3 />
              </button>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
