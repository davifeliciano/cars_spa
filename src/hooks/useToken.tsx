import { useContext } from "react";
import { TokenContext } from "../contexts/token/TokenContext";

export const useToken = () => {
  const context = useContext(TokenContext);

  if (context === undefined) {
    throw new Error("useToken must be used within an TokenProvider");
  }

  return context;
};
