import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router";
import { useToken } from "../hooks/useToken";

export default function HeaderAppBar() {
  const { token } = useToken();

  const NavLinks = () => {
    if (token) {
      return (
        <>
          <Button color="inherit" href="/auth/logout">
            Logout
          </Button>
        </>
      );
    }

    return (
      <>
        <Button color="inherit" href="/auth/login">
          Login
        </Button>
      </>
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={RouterLink}
            to={"/"}
            sx={{ flexGrow: 1, color: "inherit", textDecoration: "none" }}
          >
            Car Manager
          </Typography>
          <NavLinks />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
