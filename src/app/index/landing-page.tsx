"use client";

import About from "@/components/About";
import ExportedList from "@/components/ExportedList";
import Hero from "@/components/Hero";
import HospitalsList from "@/components/HospitalsList";
import { Box } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../AppContext";
import { auth } from "../services/firebase/firebase";

type Props = {};

const Index = (props: Props) => {
  const { setCurrentUser } = useContext(AppContext);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const client = auth.currentUser;
        setCurrentUser(client);
      }
    });
  }, [setCurrentUser]);

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
