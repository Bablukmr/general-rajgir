import React, { useState } from "react";
import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import {
  Dashboard,
  Book,
  Group,
  Notifications,
  Settings,
  Logout,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import HomeIcon from "@mui/icons-material/Home";
import DownloadIcon from "@mui/icons-material/Download";
import PasswordIcon from '@mui/icons-material/Password';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleListItemClick = (index, path) => {
    setSelectedIndex(index);
    if (path === "/logout") {
      handleLogout();
    } else {
      navigate(path);
    }
  };

  const menuItems = [
    {
      text: "Home",
      icon: <HomeIcon />,
      index: 0,
      path: "/",
    },
    {
      text: "Download Ticket",
      icon: <DownloadIcon />,
      index: 2,
      path: "/downloadticket",
    },
    {
      text: "Password Change",
      icon: <PasswordIcon />,
      index: 6,
      path: "/change-password",
    },
    {
      text: "Total Booking",
      icon: <Dashboard />,
      index: 1,
      path: "/total-booking",
    },

    {
      text: "Staff Members",
      icon: <Group />,
      index: 3,
      path: "/staff-members",
    },
    {
      text: "Notification",
      icon: <Notifications />,
      index: 4,
      path: "/notification",
    },
    { text: "Setting", icon: <Settings />, index: 5, path: "/setting" },

    { text: "Log Out", icon: <Logout />, index: 7, path: "/logout" },
  ];

  return (
    <div className="flex flex-col w-[210px] h-screen bg-white shadow-lg">
      <div className="p-4 z-20  text-gray-400 text-lg font-bold">
        My Dashboard
      </div>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.index}
            className={`hover:bg-gray-200 ${
              selectedIndex === item.index ? "bg-gray-200 text-blue-600" : ""
            }`}
            onClick={() => handleListItemClick(item.index, item.path)}
          >
            <ListItemIcon
              className={`${
                selectedIndex === item.index ? "text-blue-600" : "text-gray-600"
              }`}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              className={
                selectedIndex === item.index
                  ? "text-blue-600 "
                  : "text-gray-600"
              }
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
