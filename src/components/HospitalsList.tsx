"use client";
import { AppContext } from "@/app/AppContext";
import { auth, storage } from "@/app/services/firebase/firebase";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "@/components/Loader";
import Pagination from "@mui/material/Pagination";

const HospitalsList = () => {
  const [location, setLocation] = useState("Ibadan");
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);

  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHospitals = filteredHospitals.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const cities: string[] = [
    "Lekki",
    "Abuja",
    "Yaba",
    "Port Harcourt",
    "Ibadan",
    "Ilorin",
    "Kano",
    "calabar",
    "Lagos Island",
    "Ikorodu",
    "Benin",
    "Abeokuta",
    "Jos",
    "Enugu",
    "Ikeja",
  ];

  useEffect(() => {
    const getHospitals = async () => {
      try {
        const res = await fetch(`https://api.reliancehmo.com/v3/providers?`);
        if (!res.ok) {
          throw new Error("Something went wrong");
        } else {
          const data = await res.json();
          const filteredData = data.data.filter(
            (hospital: Hospital) => hospital.location == location
          );
          setHospitals(filteredData);
          setFilteredHospitals(filteredData);
          setCurrentPage(1); // Reset current page to 1 when location changes
        }
      } catch (error) {
        console.log(error);
      }
    };

    getHospitals();
  }, [location]);

  const exportHospitals = async () => {
    try {
      let csvData = "Hospital name, address,";

      for (let i = 0; i < currentHospitals.length; i++) {
        const hospital = currentHospitals[i];
        const { name, address } = hospital;

        const row = `${name}, ${address}`;
        csvData += row;
      }

      const storageRef = ref(storage, `hospitals/${location}_hospitals.csv`);

      await uploadString(storageRef, csvData);
      toast.success(`Hospitals in ${location} exported successfully!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log("Error exporting hospitals:", error);
      toast.error("You need to be logged in to export hospitals!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

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
            padding: "1rem",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            height: "fit-content",
          }}
        >
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              my: "1.5rem",
            }}
          >
            <Typography sx={{ fontWeight: "bold", pr: "1rem" }}>
              Showing Hospitals in{" "}
            </Typography>{" "}
            <TextField
              sx={{
                borderRadius: "10px",
                border: "none",
                mr: "auto",
                width: "fit-content",
              }}
              label="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button onClick={() => exportHospitals()} className="button">
              Export Hospital List
            </button>
          </Box>
          <Grid container columnSpacing={2}>
            {!filteredHospitals.length ? (
              <Loader />
            ) : (
              currentHospitals.map((hospital, index) => (
                <Grid item xs={12} sm={6} md={6} key={hospital.id}>
                  <Box
                    sx={{
                      padding: ".7rem",
                      boxShadow: "0 0 3px rgba(0, 0, 0, 0.2)",
                      borderRadius: "10px",
                      margin: ".8rem 0",
                    }}
                  >
                    <Typography
                      style={{ fontSize: "1.1rem", fontWeight: "600" }}
                    >
                      {hospital.name}
                    </Typography>
                    <Typography style={{ fontSize: "1rem", fontWeight: "500" }}>
                      {hospital.address}
                    </Typography>
                  </Box>
                </Grid>
              ))
            )}
          </Grid>
          <Pagination
            count={Math.ceil(filteredHospitals.length / itemsPerPage)}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            color="primary"
            sx={{ marginTop: "2rem", alignSelf: "center" }}
          />
        </Grid>
      </Grid>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </Box>
  );
};

export default HospitalsList;
