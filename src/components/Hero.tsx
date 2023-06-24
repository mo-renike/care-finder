import { Box, Typography } from "@mui/material";
import React from "react";
import steth from "@/assets/hospital.jpg";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";

type Props = {};

const Hero = (props: Props) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${steth.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "&:after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "90vh",
          backgroundColor: "rgba(0,0,0,0)",
        },
      }}
    >
      <Box
        sx={{
          padding: "1rem",
          maxWidth: "600px",
          zIndex: "12",
          textAlign: "center",
          boxShadow: "0 0 3px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
        }}
      >
        <Typography variant="h3">Carefinder</Typography>
        <Typography>
          Get easy access to healthcare services around you
        </Typography>
        <Link href="/#find-hospitals">
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
