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
  return (
    <AppBar
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
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
// <Box>
//   <Box sx={{ display: "flex" }}>
//     {" "}
//     <Image
//       width={100}
//       height={100}
//       src={currentUser?.photoURL}
//       alt="DP"
//     />
//     <Typography>
//       {currentUser?.displayName} <AiOutlineArrowDown />
//     </Typography>
//   </Box>

//   <Button onClick={signOut}>
//     <AiOutlineLogin />
//     <Typography>Logout</Typography>
//   </Button>
// </Box>
