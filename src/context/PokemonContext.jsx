/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
  const value = {};

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
};

export { PokemonContext, PokemonProvider };
