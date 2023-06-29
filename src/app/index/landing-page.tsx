"use client";
import Head from "next/head";

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
      <Head>
        <title> Home | CareFinder</title>
        <meta
          name="description"
          content="CareFinder is a platform that helps you find the best hospitals in Nigeria"
        />
      </Head>
      <Hero />
      <About />
      <HospitalsList />
      <ExportedList />
    </Box>
  );
};

export default Index;
