import { Box, Typography, Grid } from "@mui/material";
import React from "react";
import {
  AiOutlineMessage,
  AiOutlineExport,
  AiOutlineSearch,
  AiOutlineShareAlt,
} from "react-icons/ai";

type Props = {};

const About = (props: Props) => {
  return (
    <Box
      sx={{ textAlign: "center", p: "4rem", background: "rgb(245, 245, 245)" }}
    >
      <Typography variant="h3">About</Typography>
      <Typography variant="body1">
        Carefinder is a platform where users can search for hosiptals in their
        areas, <br /> export hospital details for your records and enhance your
        healthcare experience <br />
        by connecting with others and sharing valuable resources.
      </Typography>
      <Grid container justifyContent="center" sx={{ my: "5rem" }}>
        <Grid item xs={12} sm={6} md={2} lg={2}>
          <AiOutlineSearch fontSize={40} />
          <Typography variant="h6">Search For Hospitals</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={2} lg={2}>
          <AiOutlineShareAlt fontSize={40} />
          <Typography variant="h6">Share with others</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={2} lg={2}>
          <AiOutlineExport fontSize={40} />
          <Typography variant="h6">Export hospitals list </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={2} lg={2}>
          <AiOutlineMessage fontSize={40} />
          <Typography variant="h6">Chat with an AI bot</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
