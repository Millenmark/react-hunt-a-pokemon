import { useState, useContext } from "react";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { AiFillCheckCircle } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import { PokemonContext } from "../context/PokemonContext";

const PokemonList = () => {
  const { pokemons, setPokemons } = useContext(PokemonContext);
  const [editedPokemonName, setEditedPokemonName] = useState("");
  const [editingPokemonIndex, setEditingPokemonIndex] = useState(-1);

  const handleDelete = (pokemon) => {
    if (window.confirm(`Are you sure you want to delete ${pokemon.name}?`)) {
      setPokemons((prevData) =>
        prevData.filter((item) => item.name !== pokemon.name)
      );
    }
  };

  console.log(pokemons);

  const handleEdit = (index) => {
    const pokemon = pokemons[index];
    setEditingPokemonIndex(index);
    setEditedPokemonName(pokemon.name);
  };

  const handleSaveEdit = (index) => {
    const updatedPokemonData = [...pokemons];
    updatedPokemonData[index].name = editedPokemonName;
    setPokemons(updatedPokemonData);
    setEditingPokemonIndex(-1);
    setEditedPokemonName("");
  };

  const handleCancelEdit = () => {
    setEditingPokemonIndex(-1);
    setEditedPokemonName("");
  };

  return (
    <div>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-9 place-items-center">
        {pokemons.map((pokemon, index) => (
          <li key={index} className="flex flex-col justify-center items-center">
            {editingPokemonIndex === index ? (
              <div className="flex gap-3 relative">
                <input
                  className="border w-fit p-1 rounded-sm"
                  type="text"
                  value={editedPokemonName}
                  onChange={(e) => setEditedPokemonName(e.target.value)}
                />
                <div className="flex justify-center items-center gap-1 absolute right-2 top-1/2 -translate-y-1/2">
                  <button onClick={() => handleSaveEdit(index)}>
                    <AiFillCheckCircle className="text-green-500 text-2xl" />
                  </button>
                  <button onClick={() => handleCancelEdit()}>
                    <GiCancel className="text-red-400 text-[1.4rem]" />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <img src={pokemon.imageUrl} alt={pokemon.name} />
                <div className=" capitalize flex justify-center items-center gap-2">
                  <p>{pokemon.name}</p>
                  <div className="flex justify-center items-center gap-3">
                    <button type="button" onClick={() => handleEdit(index)}>
                      <FiEdit3 />
                    </button>
                    <button type="button" onClick={() => handleDelete(pokemon)}>
                      <RiDeleteBin4Fill className="text-red-600" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
