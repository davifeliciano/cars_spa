import { AxiosResponse } from "axios";
import axiosInstance from "../api/axios";
import { Car, CarWithoutId } from "../models/Car";

export default class CarsService {
  static async createCar(car: CarWithoutId) {
    return axiosInstance.post<Car, AxiosResponse<Car, CarWithoutId>>(
      "/carros",
      car
    );
  }

  static async updateCar(car: Car) {
    return axiosInstance.put<Car, AxiosResponse<Car, CarWithoutId>>(
      `/carros/${car.id}`,
      car
    );
  }

  static async getCar(id: number) {
    return axiosInstance.get<Car>(`/carros/${id}`);
  }

  static async deleteCar(id: number) {
    return axiosInstance.delete<Car>(`/carros/${id}`);
  }

  static async exportCars() {
    return axiosInstance.get("/carros/export-cars", { responseType: "blob" });
  }
}
