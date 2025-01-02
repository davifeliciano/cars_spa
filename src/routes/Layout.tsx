import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router";
import HeaderAppBar from "../components/HeaderAppBar";

export default function Layout() {
  return (
    <React.Fragment>
      <HeaderAppBar />
      <Container maxWidth="md">
        <Outlet />
      </Container>
    </React.Fragment>
  );
}
