"use client";
import { AppContext } from "@/app/AppContext";
import { auth, storage } from "@/app/services/firebase/firebase";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useState, useEffect, SetStateAction, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "@/components/Loader";
import Pagination from "@mui/material/Pagination";

const HospitalsList = () => {
  const { currentUser } = useContext(AppContext);
  const [location, setLocation] = useState("Lagos");
  const { hospitals, setHospitals } = useContext(AppContext);
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

  const isMobile = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    const getHospitals = async () => {
      try {
        const res = await fetch(`https://api.reliancehmo.com/v3/providers?`);
        if (!res.ok) {
          throw new Error("Something went wrong");
        } else {
          const result = await res.json();
          const data = result.data;
          const filteredData = data.filter((hospital: Hospital) => {
            return hospital.address
              .toLowerCase()
              .includes(location.toLowerCase());
          });
          setHospitals(filteredData);
          setFilteredHospitals(filteredData);
          setCurrentPage(1);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getHospitals();
  }, [location]);

  const exportHospitals = async () => {
    if (!currentUser) {
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
      return;
    }
    try {
      let csvData = "Hospital name, address,";

      for (let i = 0; i < currentHospitals.length; i++) {
        const hospital = currentHospitals[i];
        const { name, address } = hospital;

        const row = `${name}, ${address}`;
        csvData += row;
      }

      const storageRef = ref(storage, `hospitals/hospitals_in_${location}.csv`);

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
            boxShadow: "0 0 3px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            height: "fit-content",
          }}
        >
          <Typography variant="h6">Nearby Cities</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "row" : "column",
              overflowX: isMobile ? "auto" : "visible",
              maxWidth: isMobile ? "100%" : "unset",
              flexWrap: "nowrap",
              //   pb: isMobile ? "1rem" : "unset",
            }}
          >
            {cities.map((city) => (
              <Button
                variant="text"
                key={city}
                sx={{
                  textTransform: "capitalize",
                  whiteSpace: "nowrap",
                  marginRight: isMobile ? "0.1rem" : "auto",
                  minWidth: isMobile ? "unset" : "120px",
                }}
                onClick={() => setLocation(city)}
              >
                {city}
              </Button>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={9}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              my: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            <Typography sx={{ my: 1, fontWeight: "bold", pr: "1rem" }}>
              Showing Hospitals in{" "}
            </Typography>{" "}
            <TextField
              sx={{
                my: 1,
                borderRadius: "10px",
                border: "none",
                mr: "auto",
                width: "fit-content",
              }}
              label="Enter location"
              value={location}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setLocation(e.target.value)
              }
            />
            <button
              type="button"
              onClick={() => exportHospitals()}
              className="button"
            >
              Export Hospital List
            </button>
          </Box>
          <Grid
            container
            columnSpacing={isMobile ? 1 : 2}
            rowSpacing={isMobile ? 2 : 0}
          >
            {!filteredHospitals.length ? (
              <Loader />
            ) : (
              currentHospitals.map((hospital, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  sx={{
                    width: isMobile ? "100%" : "unset",
                    pr: isMobile ? "1rem" : "unset",
                  }}
                  key={hospital.id}
                >
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
    </Box>
  );
};

export default HospitalsList;
