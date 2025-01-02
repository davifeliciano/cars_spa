import { Avatar, Box, Card, CardHeader, Skeleton } from "@mui/material";
import React, { useEffect } from "react";
import axiosInstance from "../api/axios";
import { useProtectedRoute } from "../hooks/useProtectedRoute";
import Profile from "../models/Profile";

export default function Index() {
  useProtectedRoute();
  const [profile, setProfile] = React.useState<Profile | null>(null);

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

  return (
    <React.Fragment>
      <Box mt={2}>
        <Card>
          <CardHeader
            title={profile ? profile.nome : <Skeleton />}
            subheader={profile ? profile.cargo : <Skeleton />}
            avatar={
              profile ? (
                <Avatar alt={profile.nome} src={profile.avatar} />
              ) : (
                <Skeleton variant="circular" width={40} height={40} />
              )
            }
          />
        </Card>
      </Box>
    </React.Fragment>
  );
}
