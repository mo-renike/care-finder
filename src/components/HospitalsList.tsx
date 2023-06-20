import { GET } from "@/app/api/hospitals/route";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

type Props = {};

const HospitalsList = async (props: Props) => {
  const [location, setLocation] = useState("Uyo");

  const cities: string[] = [
    "Lagos",
    "Abuja",
    "Port Harcourt",
    "Ibadan",
    "Kano",
    "calabar",
    "Benin City",
  ];
  const latitude = 6.456; // Provide the latitude value
  const longitude = 3.012; // Provide the longitude value
  const hospitalData = GET({
    query: { latitude, longitude },
  });

  const hospitals = await hospitalData;

  console.log(hospitals);

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
        </Grid>
      </Grid>
    </Box>
  );
};

export default HospitalsList;
