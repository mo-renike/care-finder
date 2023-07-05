import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import steth from "@/assets/hospital.jpg";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";

type Props = {};

const Hero = (props: Props) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Box
      sx={{
        backgroundImage: `url(https://images.pexels.com/photos/6303586/pexels-photo-6303586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: isMobile ? "80vh" : "100vh",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        "&:after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: isMobile ? "80vh" : "100vh",
          backgroundColor: "rgba(0,0,0,0)",
        },
      }}
    >
      <Box
        sx={{
          padding: "1rem",
          maxWidth: "500px",
          zIndex: "12",
          textAlign: isMobile ? "center" : "left",
          // boxShadow: "0 0 3px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
          // backgroundColor: "rgba(255, 255, 255, 0.2)",
          marginLeft: isMobile ? "0" : "5rem",
        }}
      >
        <Typography variant="h1">Find Hospitals closest to you</Typography>
        <Typography>
          Get information about hospitals in your location and share your
          experience with others. <br /> You can also chat with our AI bot to
          get answers to your health related questions.
        </Typography>
        <Link
          href="/#find-hospitals"
          style={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <button style={{ padding: "3px 1rem" }}>
            <AiOutlineSearch style={{ marginRight: "10px" }} />
            <Typography>Find Hospitals in your location</Typography>
          </button>
        </Link>{" "}
      </Box>
    </Box>
  );
};

export default Hero;
