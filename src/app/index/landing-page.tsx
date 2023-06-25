"use client";

import About from "@/components/About";
import ExportedList from "@/components/ExportedList";
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
      <ExportedList />
    </Box>
  );
};

export default Index;
