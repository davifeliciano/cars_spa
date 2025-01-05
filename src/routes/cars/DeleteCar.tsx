import { HttpStatusCode } from "axios";
import { enqueueSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import CarsService from "../../services/CarsService";

export default function DeleteCar() {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const idNumber = Number(id);

    if (Number.isNaN(idNumber)) {
      enqueueSnackbar("Invalid car ID", { variant: "error" });
      navigate("/");
      return;
      // TODO! Navigate back to the previous page when pagination
      //       with query params is implemented
    }

    CarsService.deleteCar(idNumber)
      .then(() => {
        enqueueSnackbar(`Car ${idNumber} deleted`, {
          variant: "success",
        });
        navigate("/");
        // TODO! Navigate back to the previous page when pagination
        //       with query params is implemented
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
  }, [id, navigate]);

  return <React.Fragment></React.Fragment>;
}
