import { Box } from "@mui/material";
import React from "react";
import steth from "@/assets/hospital.jpg";

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
        // add a dark overlay to the image
        "&:after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0)",
        },
      }}
    ></Box>
  );
};

export default Hero;
