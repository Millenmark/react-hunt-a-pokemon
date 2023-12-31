import { useState, useContext } from "react";
import { PokemonContext } from "../context/PokemonContext";
import axios from "axios";

export default function Modal() {
  const [showModal, setShowModal] = useState(false);
  const [newPokemonName, setNewPokemonName] = useState("");
  const [error, setError] = useState(null);

  const { setPokemons } = useContext(PokemonContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPokemonName.trim() !== "") {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${newPokemonName
            .trim()
            .toLowerCase()}/`
        );
        const imageUrl = response?.data?.sprites?.front_default;
        setPokemons((prevData) => [
          ...prevData,
          {
            name: newPokemonName.trim().toLowerCase(),
            imageUrl: imageUrl,
          },
        ]);
        setNewPokemonName("");
        setShowModal(false);
      } catch (error) {
        console.log("Error fetching Pokemon data:", error);
        setError("There is no such pokemon. Check the spelling and try again.");
      }
    }
  };

  const handleNameChange = (e) => {
    setNewPokemonName(e.target.value);
  };

  return (
    <>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add Pokemon
      </button>
      {showModal ? (
        <>
          <form
            onSubmit={handleSubmit}
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Enter Pokemon Name</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {/* <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    
                  </p> */}
                  <input
                    className="w-full p-3"
                    type="text"
                    name="name"
                    id="name"
                    value={newPokemonName}
                    onChange={handleNameChange}
                    placeholder="Enter the name of your pokemon"
                    required
                  />
                  {error && <small className="text-red-500">{error}</small>}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Add This Pokemon
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
