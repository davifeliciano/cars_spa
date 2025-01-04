import { Box, Container, Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../../api/axios";
import CreateAndUpdateForm from "../../components/CreateAndUpdateForm";
import { useProtectedRoute } from "../../hooks/useProtectedRoute";
import { Car, CarWithoutId } from "../../models/Car";

export default function NewCar() {
  useProtectedRoute();
  const navigate = useNavigate();

  const [car, setCar] = useState<CarWithoutId>({
    modelo: "",
    ano: 1900,
    cor: "",
    cavalosDePotencia: 0,
    fabricante: "",
    pais: "",
  });

  const handleSubmit = () => {
    axiosInstance
      .post<Car, AxiosResponse<Car, CarWithoutId>>("/carros", car)
      .then(() => {
        enqueueSnackbar("Car created successfully", { variant: "success" });
        // navigate(`/carros/${response.data.id}`, { replace: true });
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        // TODO! Handle error and show a snackbar
      });
  };

  return (
    <Container maxWidth="md">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          New Car
        </Typography>
        <CreateAndUpdateForm
          car={car}
          setCar={setCar}
          onValidSubmit={handleSubmit}
        />
      </Box>
    </Container>
  );
}
