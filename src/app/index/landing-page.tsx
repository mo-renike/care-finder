"use client";

import About from "@/components/About";
import Hero from "@/components/Hero";
import HospitalsList from "@/components/HospitalsList";
import { Box } from "@mui/material";
import React from "react";

type Props = {};

const Index = (props: Props) => {
  return (
    <Box>
      <Hero />
      <About />
      <HospitalsList />
    </Box>
  );
};

export default Index;
