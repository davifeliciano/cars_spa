import axiosInstance from "../api/axios";
import { Token } from "../models/Token";

export type LoginResponse = { token: Token };

class LoginService {
  static async login(email: string, password: string) {
    return axiosInstance.post<LoginResponse>("/usuarios/login", {
      email,
      password,
    });
  }
}

export default LoginService;
