"use cient";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { AiFillHome, AiOutlineSearch, AiOutlineLogin } from "react-icons/ai";
import { MdOutlineLocalHospital } from "react-icons/md";

const Navbar = () => {
  return (
    <AppBar
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
        zIndex: 100,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link href="/">
          {" "}
          <MdOutlineLocalHospital />
          <Typography variant="h6" component="div">
            CareFinder
          </Typography>
        </Link>

        <Box sx={{ display: "flex" }}>
          <Link href="/">
            <AiFillHome />
            <Typography>Home</Typography>
          </Link>
          <Link href="/#find-hospitals">
            <AiOutlineSearch />
            <Typography>Find Hospitals</Typography>
          </Link>
          <Link href="/signup">
            <AiOutlineLogin />
            <Typography>Login</Typography>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
