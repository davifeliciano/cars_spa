import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useToken } from "../../hooks/useToken";

export default function Logout() {
  const { setToken } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    setToken(null);
    navigate("/auth/login");
  }, [navigate, setToken]);

  return <React.Fragment></React.Fragment>;
}
