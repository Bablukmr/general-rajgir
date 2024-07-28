import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Backdrop,
  useTheme,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Logout from "@mui/icons-material/Logout";
import Login from "./Login";
import { logout } from "../redux/authSlice";

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLinkClick = () => {
    setMobileOpen(false); // Close the drawer when a link is clicked
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const routes = [
    { name: "Home", path: "/" },
    // Add more routes as needed
  ];

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <img src="/logo.png" alt="Logo" width={150} className="m-3" />
      </Typography>
      <div className="flex flex-col items-start ml-2">
        <List>
          {routes.map((route, index) => (
            <ListItem
              button
              key={index}
              component={Link}
              to={route.path}
              onClick={handleLinkClick} // Close drawer when link is clicked
            >
              <ListItemText primary={route.name} />
            </ListItem>
          ))}
        </List>
        {isAuthenticated ? (
          <Button
            sx={{ textTransform: "none" }}
            variant="outlined"
            onClick={handleLogout}
            startIcon={<Logout />}
          >
            Logout
          </Button>
        ) : (
          <Login setMobileOpen={setMobileOpen} />
        )}
        <Button
          sx={{ textTransform: "none", mt: 2 }}
          variant="outlined"
          startIcon={<ConfirmationNumberIcon />}
          onClick={() => {
            setMobileOpen(false);
            navigate("/downloadticket");
          }}
        >
          Download Ticket
        </Button>
      </div>
    </Box>
  );

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar
          component="nav"
          position="sticky"
          sx={{
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[2],
          }}
        >
          <div className="md:px-[20px] xl:px-[200px]">
            <Toolbar>
              <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
                <img src="/logo.png" alt="Logo" width={150} />
              </Box>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{
                  display: { md: "none" },
                  color: theme.palette.text.primary,
                }}
              >
                <MenuIcon />
              </IconButton>
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                {routes.map((route, index) => (
                  <Button
                    key={index}
                    component={Link}
                    to={route.path}
                    sx={{
                      color: theme.palette.text.primary,
                      textTransform: "none",
                    }}
                    onClick={handleLinkClick} // Close drawer when link is clicked
                  >
                    {route.name}
                  </Button>
                ))}
                {isAuthenticated ? (
                  <div>
                    <Typography sx={{ mr: 2 }}>{user?.name}</Typography>
                    <IconButton
                      color="inherit"
                      onClick={handleMenuOpen}
                      sx={{ p: 0 }}
                    >
                      <Avatar alt={user?.name} src={user?.avatarUrl} />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      sx={{ mt: "45px" }}
                    >
                      <MenuItem
                        onClick={() => {
                          navigate("/profile");
                          handleMenuClose();
                        }}
                      >
                        <ListItemIcon>
                          <AccountCircle fontSize="small" />
                        </ListItemIcon>
                        Profile
                      </MenuItem>
                      <Divider />
                      <MenuItem
                        onClick={() => {
                          handleLogout();
                          handleMenuClose();
                        }}
                      >
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                      </MenuItem>
                    </Menu>
                  </div>
                ) : (
                  <Login setMobileOpen={setMobileOpen} />
                )}
                <Button
                  sx={{ textTransform: "none" }}
                  variant="outlined"
                  startIcon={<ConfirmationNumberIcon />}
                  onClick={() => navigate("/downloadticket")}
                >
                  Download Ticket
                </Button>
                <Box
                  sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
                >
                  <img src="/naturelogo.png" alt="Logo" width={190} />
                </Box>
              </Box>
            </Toolbar>
          </div>
        </AppBar>
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Backdrop
          sx={{ zIndex: (theme) => theme.zIndex.drawer - 1 }}
          open={mobileOpen}
          onClick={handleDrawerToggle}
        />
      </Box>
    </>
  );
}

export default Header;
