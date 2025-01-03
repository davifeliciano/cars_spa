import { Add, Download } from "@mui/icons-material";
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import React, { useEffect } from "react";
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

  useEffect(() => {
    axiosInstance
      .get<Profile>("/usuarios/my-profile")
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
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
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 32, right: 32 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction icon={<Add />} tooltipTitle="Adicionar Carro" />
        <SpeedDialAction icon={<Download />} tooltipTitle="Exportar" />
      </SpeedDial>
    </React.Fragment>
  );
}
