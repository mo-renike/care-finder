"use cient";
import React, { useContext } from "react";
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
} from "@mui/material";
import {
  AiFillHome,
  AiOutlineSearch,
  AiOutlineLogin,
  AiOutlinePlus,
} from "react-icons/ai";
import { MdOutlineLocalHospital } from "react-icons/md";
import { AppContext } from "@/app/theme-provider";
import { signOut } from "@/app/services/firebase/firebase";

const Navbar = () => {
  const { currentUser } = useContext(AppContext);

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
          {currentUser ? (
            <Link href="/#find-hospitals">
              <AiOutlinePlus />
              <Typography>Find Hospitals</Typography>
            </Link>
          ) : (
            ""
          )}
          {currentUser ? (
            <Button onClick={signOut}>
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
    </AppBar>
  );
};

export default Navbar;
