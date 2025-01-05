import { Box, Container, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router";
import CreateAndUpdateForm from "../../components/CreateAndUpdateForm";
import { useProtectedRoute } from "../../hooks/useProtectedRoute";
import { CarWithoutId } from "../../models/Car";
import CarsService from "../../services/CarsService";

export default function NewCar() {
  useProtectedRoute();
  const navigate = useNavigate();

  const [car, setCar] = useState<CarWithoutId | null>({
    modelo: "",
    ano: 1900,
    cor: "",
    cavalosDePotencia: 0,
    fabricante: "",
    pais: "",
  });

  const handleSubmit = () => {
    if (!car) {
      return;
    }

    CarsService.createCar(car)
      .then(() => {
        enqueueSnackbar("Car created successfully", { variant: "success" });
        // TODO! Navigate back to the previous page when pagination
        //       with query params is implemented
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
