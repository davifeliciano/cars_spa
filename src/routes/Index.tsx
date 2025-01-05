import { Add, Download } from "@mui/icons-material";
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { HttpStatusCode } from "axios";
import { enqueueSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../api/axios";
import CarTable from "../components/CarTable";
import ProfileCard from "../components/ProfileCard";
import { useProtectedRoute } from "../hooks/useProtectedRoute";
import { Car } from "../models/Car";
import Profile from "../models/Profile";
import CarsService from "../services/CarsService";

export default function Index() {
  // TODO! Map page and rowsPerPage to URL query params
  useProtectedRoute();
  const [profile, setProfile] = React.useState<Profile | null>(null);
  const [cars, setCars] = React.useState<Car[] | null>(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get<Profile>("/usuarios/my-profile")
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.error(error);

        if (
          error.response?.status === HttpStatusCode.BadRequest ||
          error.response?.status === HttpStatusCode.InternalServerError
        ) {
          enqueueSnackbar("Something went wrong. Prompting login again.", {
            variant: "error",
          });
        }

        navigate("/auth/logout");
      });
  }, [navigate]);

  useEffect(() => {
    axiosInstance
      .get<Car[]>("/carros", { headers: { page: page, size: rowsPerPage } })
      .then((response) => {
        setCars(response.data);
      })
      .catch((error) => {
        console.error(error);

        if (error.response?.status === HttpStatusCode.InternalServerError) {
          enqueueSnackbar("Something went wrong. Prompting login again.", {
            variant: "error",
          });
        }

        navigate("/auth/logout");
      });
  }, [page, rowsPerPage, navigate]);

  const handleExport = () => {
    CarsService.exportCars()
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "cars.csv");
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar("Something went wrong on the cars export", {
          variant: "error",
        });
      });
  };

  return (
    <React.Fragment>
      <Box mt={2}>
        <ProfileCard profile={profile} />
      </Box>
      <Box mt={2}>
        <CarTable
          cars={cars}
          page={page}
          handleChangePage={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          handleChangeRowsPerPage={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </Box>
      <SpeedDial
        ariaLabel="Adicionar ou exportar carros"
        sx={{ position: "fixed", bottom: 32, right: 32 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          icon={<Add />}
          tooltipTitle="Adicionar Carro"
          onClick={() => navigate("/cars/new")}
        />
        <SpeedDialAction
          icon={<Download />}
          tooltipTitle="Exportar"
          onClick={handleExport}
        />
      </SpeedDial>
    </React.Fragment>
  );
}
