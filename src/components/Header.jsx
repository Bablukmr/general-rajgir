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
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { logout } from "../redux/authSlice";

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorSubEl, setAnchorSubEl] = useState(null);
  const [mobileSubMenu, setMobileSubMenu] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLinkClick = (hasSubitems) => {
    if (!hasSubitems) {
      setMobileOpen(false); // Close the drawer only if there are no subitems
    }
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

  const handleSubMenuOpen = (event) => {
    setAnchorSubEl(event.currentTarget);
  };

  const handleSubMenuClose = () => {
    setAnchorSubEl(null);
  };

  const handleMobileSubMenuOpen = (index) => {
    setMobileSubMenu(mobileSubMenu === index ? null : index);
  };

  const routes = [
    { name: "Home", path: "/" },
    {
      name: "About Us",
      path: "#",
      subitems: [
        { name: "Zoo Safari", path: "/aboutus/zooinfo" },
        { name: "Nature Safari", path: "/aboutus/natureinfo" },
      ],
    },
    { name: "How To Reach", path: "/howtoreach" },
    { name: "Term & Conditions", path: "/t&c" },
  ];

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Link to={"/"}>
          <img src="/logo.png" alt="Logo" width={150} className="m-3" />
        </Link>
      </Typography>
      <div className="flex flex-col items-start ml-2">
        <List>
          {routes.map((route, index) => (
            <React.Fragment key={index}>
              <ListItem
                button
                component={route.subitems ? "div" : Link}
                to={route.subitems ? undefined : route.path}
                onClick={() => handleLinkClick(!!route.subitems)}
              >
                <ListItemText primary={route.name} />
                {route.subitems && (
                  <IconButton onClick={() => handleMobileSubMenuOpen(index)}>
                    <ArrowDropDownIcon />
                  </IconButton>
                )}
              </ListItem>
              {route.subitems &&
                mobileSubMenu === index &&
                route.subitems.map((subitem, subIndex) => (
                  <ListItem
                    key={subIndex}
                    button
                    component={Link}
                    to={subitem.path}
                    sx={{ pl: 4 }}
                    onClick={() => setMobileOpen(false)}
                  >
                    <ListItemText primary={subitem.name} />
                  </ListItem>
                ))}
            </React.Fragment>
          ))}
        </List>
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
                <Link to={"/"}>
                  {" "}
                  <img src="/logo.png" alt="Logo" width={150} />
                </Link>
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
                  <div key={index}>
                    {!route.subitems ? (
                      <Button
                        component={Link}
                        to={route.path}
                        sx={{
                          color: theme.palette.text.primary,
                          textTransform: "none",
                        }}
                        onClick={() => handleLinkClick(false)}
                      >
                        {route.name}
                      </Button>
                    ) : (
                      <>
                        <Button
                          sx={{
                            color: theme.palette.text.primary,
                            textTransform: "none",
                          }}
                          onClick={handleSubMenuOpen}
                        >
                          {route.name}
                          <ArrowDropDownIcon />
                        </Button>
                        <Menu
                          anchorEl={anchorSubEl}
                          open={Boolean(anchorSubEl)}
                          onClose={handleSubMenuClose}
                          keepMounted
                        >
                          {route.subitems.map((subitem, subIndex) => (
                            <MenuItem
                              key={subIndex}
                              component={Link}
                              to={subitem.path}
                              onClick={handleSubMenuClose}
                            >
                              {subitem.name}
                            </MenuItem>
                          ))}
                        </Menu>
                      </>
                    )}
                  </div>
                ))}
                <Button
                  sx={{ textTransform: "none" }}
                  variant="outlined"
                  startIcon={<ConfirmationNumberIcon />}
                  onClick={() => navigate("/downloadticket")}
                >
                  Download Ticket
                </Button>
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
