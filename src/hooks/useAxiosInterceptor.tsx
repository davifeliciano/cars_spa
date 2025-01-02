import { HttpStatusCode } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../api/axios";
import { useToken } from "./useToken";

const useAxiosInterceptor = () => {
  const navigate = useNavigate();
  const { setToken } = useToken();

  useEffect(() => {
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === HttpStatusCode.Unauthorized) {
          setToken(null);
          navigate("/auth/login");
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate, setToken]);
};

export default useAxiosInterceptor;
