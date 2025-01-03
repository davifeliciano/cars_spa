import { Add, Download } from "@mui/icons-material";
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../api/axios";
import CarTable from "../components/CarTable";
import ProfileCard from "../components/ProfileCard";
import { useProtectedRoute } from "../hooks/useProtectedRoute";
import { Car } from "../models/Car";
import Profile from "../models/Profile";

export default function Index() {
  useProtectedRoute();
  const [profile, setProfile] = React.useState<Profile | null>(null);
  const [cars, setCars] = React.useState<Car[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get<Profile>("/usuarios/my-profile")
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        // TODO! Handle error and show a snackbar
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .get<Car[]>("/carros")
      .then((response) => {
        setCars(response.data);
      })
      .catch((error) => {
        // TODO! Handle error and show a snackbar
        console.error(error);
      });
  }, []);

  return (
    <React.Fragment>
      <Box mt={2}>
        <ProfileCard profile={profile} />
      </Box>
      <Box mt={2}>
        <CarTable cars={cars} />
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
        <SpeedDialAction icon={<Download />} tooltipTitle="Exportar" />
      </SpeedDial>
    </React.Fragment>
  );
}
