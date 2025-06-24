import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  useTheme,
  Container,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import UserProfilePopup from "../userDetails/UserDetails";
import SideMenu from "../sideMenu/SideMenu";
import { useNavigate } from "react-router-dom";

interface MainLayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleUserClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserClose = () => {
    setAnchorEl(null);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const goToHome = () => {
    navigate("/home");
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const isLoginRoute = location.pathname.endsWith("/");
  const isRegisterRoute = location.pathname.endsWith("/register");

  useEffect(() => {}, [isLoginRoute, isRegisterRoute]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar
        position="static"
        color="primary"
        elevation={1}
        sx={{
          backgroundColor: theme.palette.primary.main,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth={false} >
          <Toolbar
            dir="rtl"
            disableGutters
            sx={{
              justifyContent: "space-between",
              width: "100%",
              display: "flex",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                onClick={handleLogout}
                aria-label="logout"
                disabled={isLoginRoute || isRegisterRoute}
                sx={{
                  ml: 2,
                  color: "white",
                }}
              >
                <LogoutIcon />
              </IconButton>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                disabled={isLoginRoute || isRegisterRoute}
                onClick={handleMenuToggle}
                sx={{
                  ml: 2,
                  color: "white",
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
              }}
            >
              MUSIC SAMPLER 🎸
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="inherit"
                disabled={isLoginRoute || isRegisterRoute}
                onClick={goToHome}
                sx={{ color: "white" }}
              >
                <HomeIcon />
              </IconButton>

              <IconButton
                color="inherit"
                onClick={handleUserClick}
                disabled={isLoginRoute || isRegisterRoute}
                sx={{
                  cursor: "pointer",
                  color: "white",
                }}
              >
                <AccountCircleIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <SideMenu open={menuOpen} onClose={handleMenuToggle} />

      <UserProfilePopup anchorEl={anchorEl} handleClose={handleUserClose} />

      <Container
        maxWidth="lg"
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
        }}
      >
        {children}
      </Container>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: theme.palette.background.default,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © 2024 כל הזכויות שמורות
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
