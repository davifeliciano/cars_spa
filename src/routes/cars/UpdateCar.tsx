import { Box, Container, Skeleton, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import CreateAndUpdateForm from "../../components/CreateAndUpdateForm";
import { useProtectedRoute } from "../../hooks/useProtectedRoute";
import { CarWithoutId } from "../../models/Car";
import CarsService from "../../services/CarsService";

export default function NewCar() {
  useProtectedRoute();
  const navigate = useNavigate();
  const { id } = useParams();
  const [car, setCar] = useState<CarWithoutId | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const idNumber = parseInt(id ?? "");

    if (Number.isNaN(idNumber)) {
      enqueueSnackbar("Invalid car ID", { variant: "error" });
      navigate("/");
      return;
      // TODO! Navigate back to the previous page when pagination
      //       with query params is implemented
    }

    CarsService.getCar(idNumber)
      .then((response) => {
        setCar(response.data);
      })
      .catch((error) => {
        console.error(error);
        // TODO! Handle error and show a snackbar
      });
  }, [navigate, id]);

  const handleSubmit = () => {
    setIsUpdating(true);

    if (!car || !id) {
      setIsUpdating(false);
      enqueueSnackbar("Please fill out all required fields", {
        variant: "error",
      });
      return;
    }

    CarsService.updateCar({ ...car, id: parseInt(id) })
      .then(() => {
        enqueueSnackbar("Car updated successfully", { variant: "success" });
        setIsUpdating(false);
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
          Update Car
        </Typography>
        {car ? (
          <CreateAndUpdateForm
            car={car}
            setCar={setCar}
            onValidSubmit={handleSubmit}
            disabled={isUpdating}
          />
        ) : (
          <Skeleton height={240} />
        )}
      </Box>
    </Container>
  );
}
