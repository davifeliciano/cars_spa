import React, { createContext } from "react";
import { Token } from "../../models/Token";

type TokenContextType = {
  token: Token | null;
  setToken: React.Dispatch<React.SetStateAction<Token | null>>;
};

export const TokenContext = createContext<TokenContextType | undefined>(
  undefined
);
