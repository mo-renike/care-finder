"use client";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { GET } from "@/app/api/routes";

type Props = {};

const HospitalsList = async (props: Props) => {
  const [location, setLocation] = useState("Ibadan");
  const [hospitals, setHospitals] = useState([]);

  const cities: string[] = [
    "Lagos",
    "Abuja",
    "Port Harcourt",
    "Ibadan",
    "Kano",
    "calabar",
    "Benin City",
  ];

  return (
    <Box sx={{ p: "4rem 2rem" }}>
      <Typography sx={{ textAlign: "center" }} variant="h3">
        Featured Hospitals
      </Typography>
      <Grid container columnGap={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box>
            <TextField label="Enter location" />
          </Box>
          <Box>
            <Typography variant="h6">Nearby Cities</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              {cities.map((city) => (
                <Button
                  key={city}
                  sx={{ textTransform: "capitalize" }}
                  onClick={() => setLocation(city)}
                >
                  {city}
                </Button>
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box>
            <Typography variant="h6">
              Showing Hospitals in {location}{" "}
            </Typography>
          </Box>
          {hospitals.map((hospital) => (
            // eslint-disable-next-line react/jsx-key
            <Box>hi</Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default HospitalsList;
