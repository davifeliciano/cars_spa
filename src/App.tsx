import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { BrowserRouter, Route, Routes } from "react-router";
import { TokenProvider } from "./contexts/token/TokenProvider";
import useAxiosInterceptor from "./hooks/useAxiosInterceptor";
import Index from "./routes/Index";
import BaseLayout from "./routes/Layout";
import Login from "./routes/auth/Login";
import Logout from "./routes/auth/Logout";
import NewCar from "./routes/cars/NewCar";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function AxiosInterceptorSetup() {
  useAxiosInterceptor();
  return null;
}

function ApplicationRoutes() {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route index element={<Index />} />
        <Route path="auth">
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
        </Route>
        <Route path="cars">
          <Route path="new" element={<NewCar />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <TokenProvider>
        <CssBaseline />
        <SnackbarProvider />
        <BrowserRouter>
          <AxiosInterceptorSetup />
          <ApplicationRoutes />
        </BrowserRouter>
      </TokenProvider>
    </ThemeProvider>
  );
}
