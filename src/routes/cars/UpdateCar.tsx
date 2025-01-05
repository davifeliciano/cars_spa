import { Box, Container, Skeleton, Typography } from "@mui/material";
import { HttpStatusCode } from "axios";
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
    const idNumber = Number(id);

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

        if (error.response?.status === HttpStatusCode.BadRequest) {
          enqueueSnackbar(`Invalid id for resource car`, {
            variant: "error",
          });
        }

        if (error.response?.status === HttpStatusCode.NotFound) {
          enqueueSnackbar(`Car ${idNumber} not found`, {
            variant: "error",
          });
        }

        if (error.response?.status === HttpStatusCode.InternalServerError) {
          enqueueSnackbar("Something went wrong", {
            variant: "error",
          });
        }

        navigate("/");
        return;
        // TODO! Navigate back to the previous page when pagination
        //       with query params is implemented
      });
  }, [navigate, id]);

  const handleSubmit = () => {
    setIsUpdating(true);
    const idNumber = Number(id);

    if (!car) {
      enqueueSnackbar("Car information not loaded yet", {
        variant: "error",
      });
    }

    if (Number.isNaN(idNumber)) {
      enqueueSnackbar(`Invalid id for resource car`, {
        variant: "error",
      });
    }

    if (!car || Number.isNaN(idNumber)) {
      setIsUpdating(false);
      return;
    }

    CarsService.updateCar({ ...car, id: idNumber })
      .then(() => {
        enqueueSnackbar("Car updated successfully", { variant: "success" });
        setIsUpdating(false);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);

        if (error.response?.status === HttpStatusCode.BadRequest) {
          enqueueSnackbar(`Car ${idNumber} not found`, {
            variant: "error",
          });
        }

        if (error.response?.status === HttpStatusCode.InternalServerError) {
          enqueueSnackbar("Something went wrong", {
            variant: "error",
          });
        }

        navigate("/");
        return;
        // TODO! Navigate back to the previous page when pagination
        //       with query params is implemented
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
