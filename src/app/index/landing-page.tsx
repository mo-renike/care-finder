"use client";
//import { Metadata } from "next";
import About from "@/components/About";
import ExportedList from "@/components/ExportedList";
import Hero from "@/components/Hero";
import HospitalsList from "@/components/HospitalsList";
import { Box } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../AppContext";
import { auth } from "../services/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Chat from "@/components/Chat";

type Props = {};
// export const metadata: Metadata = {
//   title: "Home | CareFinder",
// };
const Index = (props: Props) => {
  const { setCurrentUser, isChatOpen, toggleChat } = useContext(AppContext);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const client = auth.currentUser;
        setCurrentUser(client);
      }
    });
  }, [setCurrentUser]);

  return (
    <Box sx={{ position: "relative" }}>
      <Hero />
      <Chat />
      <About />
      <HospitalsList />
      <ExportedList />
      <Box
        sx={{
          position: "fixed",
          right: "5px",
          bottom: "5px",
          zIndex: 999,
        }}
      >
        <button
          style={{
            boxShadow: "-1px 0px 4px 0px rgba(0,0,0,0.75)",
          }}
          onClick={toggleChat}
        >
          {isChatOpen ? "Close DocGPT" : "Open DocGPT"}
        </button>
      </Box>
    </Box>
  );
};

export default Index;
