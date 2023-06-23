"use client";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";

const HospitalsList = () => {
  const [location, setLocation] = useState("Ibadan");
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [latitude, setLatitude] = useState(6.1244);
  const [longitude, setLongitude] = useState(3.3792);
  const [placeId, setPlaceId] = useState("");

  const cities: string[] = [
    "Lagos",
    "Abuja",
    "Port Harcourt",
    "Ibadan",
    "Kano",
    "calabar",
    "Benin City",
    "Jos",
    "Enugu",
  ];

  useEffect(() => {
    const getHospitals = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/hospitals?latitude=${latitude}&longitude=${longitude}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) {
          throw new Error("Something went wrong");
        } else {
          const data = await res.json();
          setHospitals(data.results);
          console.log(data.results, "data");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getHospitals();

    const findLocation = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/findplace?location=${location}`
        );
        if (!res.ok) {
          throw new Error("Something went wrong");
        } else {
          const data = await res.json();
          // console.log(data.candidates[0].geometry.location.lat, "location");

          setLatitude(data.candidates[0].geometry.location.lat);
          setLongitude(data.candidates[0].geometry.location.lng);
        }
      } catch (error) {
        console.log(error);
      }
    };
    findLocation();

    const getDetails = async () => {
      try {
        const res = await fetch(`http://localhost:8080/detaiils?id=${placeId}`);
        if (!res.ok) {
          throw new Error("Something went wrong");
        } else {
          const data = await res.json();
          console.log(data);

          setPlaceId(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDetails();
  }, [latitude, location, longitude, placeId]);

  return (
    <Box sx={{ p: "4rem 2rem" }} id="find-hospitals">
      <Typography sx={{ textAlign: "center" }} variant="h3">
        Featured Hospitals
      </Typography>
      <Grid container justifyContent="space-between" columnGap={2}>
        <Grid
          item
          xs={12}
          sm={6}
          md={2}
          lg={2}
          sx={{
            padding: "1.5rem 1rem",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            height: "fit-content",
          }}
        >
          <Box>
            <TextField
              sx={{
                borderRadius: "10px",
                border: "none",
              }}
              label="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
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
        <Grid item xs={12} sm={6} md={4} lg={9}>
          <Box>
            <Typography variant="h6">
              Showing Hospitals in {location}{" "}
            </Typography>
          </Box>
          <Grid container columnSpacing={2}>
            {hospitals.map((hospital) => (
              <Grid item xs={12} sm={6} md={4} key={hospital.place_id}>
                <Box
                  sx={{
                    padding: ".7rem",
                    boxShadow: "0 0 3px rgba(0, 0, 0, 0.2)",
                    borderRadius: "10px",
                    margin: ".8rem 0",
                  }}
                >
                  <Typography variant="h6">{hospital.name}</Typography>
                  <Typography variant="body2">{hospital.vicinity}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HospitalsList;
