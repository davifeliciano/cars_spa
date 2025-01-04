export interface Car {
  id: number;
  modelo: string;
  ano: number;
  cor: string;
  cavalosDePotencia: number;
  fabricante: string;
  pais: string;
}

export type CarWithoutId = Omit<Car, "id">;