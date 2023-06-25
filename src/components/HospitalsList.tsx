"use client";
import { AppContext } from "@/app/AppContext";
import { auth, storage } from "@/app/services/firebase/firebase";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "@/components/Loader";

const HospitalsList = () => {
  const [location, setLocation] = useState("Ibadan");
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [latitude, setLatitude] = useState(6.1244);
  const [longitude, setLongitude] = useState(3.3792);
  const [placeId, setPlaceId] = useState("");
  const [details, setDetails] = useState<Hospital[]>([]);

  const cities: string[] = [
    "Lekki",
    "Abuja",
    "Yaba",
    "Port Harcourt",
    "Ibadan",
    "Ilorin",
    "Kano",
    "calabar",
    "Benin City",
    "Abeokuta",
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
          console.log(data, "data");

          setHospitals(data.results);
          const placeIds = data.results.map(
            (hospital: { place_id: any }) => hospital.place_id
          );
          setPlaceId(placeIds);
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
          setLatitude(data.candidates[0].geometry.location.lat);
          setLongitude(data.candidates[0].geometry.location.lng);
        }
      } catch (error) {
        console.log(error);
      }
    };
    findLocation();
  }, [latitude, location, longitude]);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const detailsArray = [];
        for (const id of placeId) {
          const res = await fetch(`http://localhost:8080/details?id=${id}`);
          if (!res.ok) {
            throw new Error("Something went wrong");
          } else {
            const data = await res.json();
            detailsArray.push(data.result);
          }
        }
        setDetails(detailsArray);
      } catch (error) {
        console.log(error);
      }
    };

    getDetails();
  }, [placeId]);

  const exportHospitals = async () => {
    try {
      let csvData =
        "Hospital name, address, Phone Number, Wheelchair accessibility\n";

      for (let i = 0; i < hospitals.length; i++) {
        const hospital = hospitals[i];
        const detail = details[i];

        const { name } = hospital;
        const {
          wheelchair_accessible_entrance,
          formatted_address,
          formatted_phone_number,
        } = detail;

        const row = `${name}, ${formatted_address}, ${formatted_phone_number}, ${
          wheelchair_accessible_entrance
            ? "Wheelchair Accessible"
            : "Not Wheelchair Accessible"
        }\n`;
        csvData += row;
      }

      // Create a reference to the file in Firebase Storage
      const storageRef = ref(storage, `hospitals/${location}_hospitals.csv`);

      // Upload the CSV data to Firebase Storage
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
            {!hospitals.length || !details.length ? (
              <Loader />
            ) : (
              hospitals.map((hospital, index) => (
                <Grid item xs={12} sm={6} md={6} key={hospital.place_id}>
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
                    {details[index] && (
                      <>
                        <Typography
                          style={{ fontSize: ".8rem" }}
                          variant="body2"
                        >
                          <b>Address:</b> {details[index].formatted_address}
                        </Typography>
                        <Typography
                          style={{ fontSize: ".8rem" }}
                          variant="body2"
                        >
                          <b>Phone: </b>{" "}
                          {details[index].formatted_phone_number
                            ? details[index].formatted_phone_number
                            : "Number not provided"}
                        </Typography>
                        <Typography style={{ fontSize: ".8rem" }}>
                          {" "}
                          {details[index].wheelchair_accessible_entrance ===
                          true
                            ? "Wheelhair Accessible"
                            : "Not wheelchair Accessible"}
                        </Typography>
                      </>
                    )}
                  </Box>
                </Grid>
              ))
            )}
          </Grid>
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
