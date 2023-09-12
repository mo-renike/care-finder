"use strict";
import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Drawer,
} from "@mui/material";
import {
  AiFillHome,
  AiOutlineSearch,
  AiOutlineLogin,
  AiOutlinePlus,
  AiOutlineArrowDown,
} from "react-icons/ai";
import { MdOutlineLocalHospital } from "react-icons/md";
import { AppContext } from "@/app/AppContext";
import { signOut } from "@/app/services/firebase/firebase";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const { currentUser } = useContext(AppContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSignout = () => {
    signOut();
    toast.success("Sign out Successful!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    window.location.reload();
  };

  const renderMobileMenu = (
    <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
      <List>
        <ListItemButton onClick={handleDrawerToggle}>
          <ListItemIcon>
            <MdOutlineLocalHospital />
          </ListItemIcon>
          <ListItemText primary="CareFinder" />
        </ListItemButton>
        <ListItemButton component="a" href="/">
          <ListItemIcon>
            <AiFillHome />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton component="a" href="/#find-hospitals">
          <ListItemIcon>
            <AiOutlineSearch />
          </ListItemIcon>
          <ListItemText primary="Find Hospitals" />
        </ListItemButton>
        {currentUser ? (
          <ListItemButton component="a" href="/add-hospital">
            <ListItemIcon>
              <AiOutlinePlus />
            </ListItemIcon>
            <ListItemText primary="Add Hospitals" />
          </ListItemButton>
        ) : (
          ""
        )}
        {currentUser ? (
          <ListItemButton onClick={handleSignout}>
            <ListItemIcon>
              <AiOutlineLogin />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        ) : (
          <ListItemButton component="a" href="/signup">
            <ListItemIcon>
              <AiOutlineLogin />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItemButton>
        )}
      </List>
    </Drawer>
  );

  return (
    <AppBar
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
        zIndex: 100,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton
          color="inherit"
          aria-label="Open mobile menu"
          onClick={handleDrawerToggle}
          sx={{ display: { sm: "none", md: "block" } }}
        >
          <AiOutlineMenu />
        </IconButton>
        <Link href="/">
          <MdOutlineLocalHospital />
          <Typography variant="h6" component="div">
            CareFinder
          </Typography>
        </Link>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Link href="/">
            <AiFillHome />
            <Typography>Home</Typography>
          </Link>
          <Link href="/#find-hospitals">
            <AiOutlineSearch />
            <Typography>Find Hospitals</Typography>
          </Link>
          {currentUser ? (
            <Link href="/add-hospital">
              <AiOutlinePlus />
              <Typography>Add Hospitals</Typography>
            </Link>
          ) : (
            ""
          )}
          {currentUser ? (
            <Button onClick={handleSignout}>
              <AiOutlineLogin />
              <Typography>Logout</Typography>
            </Button>
          ) : (
            <Link href="/signup">
              <AiOutlineLogin />
              <Typography>Login</Typography>
            </Link>
          )}
        </Box>
      </Toolbar>
      {renderMobileMenu}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </AppBar>
  );
};

export default Navbar;
