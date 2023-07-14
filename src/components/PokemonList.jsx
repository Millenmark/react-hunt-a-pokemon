import axios from "axios";
import { useState, useEffect } from "react";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin4Fill } from "react-icons/ri";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        const pokemons = response.data.results;
        const updatedPokemons = await Promise.all(
          pokemons.map(async (pokemon) => {
            const res = await axios.get(pokemon.url);
            return {
              name: pokemon.name,
              imageUrl: res.data.sprites.front_default,
            };
          })
        );
        setPokemons(updatedPokemons);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (pokemon) => {
    if (window.confirm(`Are you sure you want to delete ${pokemon.name}?`)) {
      setPokemons((prevData) =>
        prevData.filter((item) => item.name !== pokemon.name)
      );
    }
  };

  return (
    <div>
      <ul className="grid grid-cols-5 gap-x-4 gap-y-9 place-items-center">
        {pokemons.map((pokemon, index) => (
          <li key={index} className="flex flex-col justify-center items-center">
            <img src={pokemon.imageUrl} alt={pokemon.name} />
            <p className=" capitalize flex justify-center items-center gap-2">
              {pokemon.name}
              <div className="flex justify-center items-center gap-3">
                <button type="button">
                  <FiEdit3 />
                </button>
                <button type="button" onClick={() => handleDelete(pokemon)}>
                  <RiDeleteBin4Fill className="text-red-600" />
                </button>
              </div>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
