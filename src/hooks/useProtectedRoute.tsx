import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useToken } from "./useToken";

export const useProtectedRoute = () => {
  const { token } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      console.log("Prompting login");
      navigate("/auth/login");
    }
  }, [token, navigate]);
};
