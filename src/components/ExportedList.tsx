import { useState, useEffect } from "react";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "@/app/services/firebase/firebase";
import { Box, Grid, Typography } from "@mui/material";

const ExportedList = () => {
  const [exportedHospitals, setExportedHospitals] = useState<
    { filename: string; downloadURL: string }[]
  >([]);

  useEffect(() => {
    const fetchExportedHospitals = async () => {
      try {
        // Retrieve the list of exported hospitals from Firebase Storage
        const storageRef = ref(storage, "hospitals");
        const listResult = await listAll(storageRef);

        const hospitalsList = [];

        // Iterate through each exported hospital file
        for (const item of listResult.items) {
          const downloadURL = await getDownloadURL(item);
          //console.log(downloadURL, "downloadURL");

          // Add the exported hospital to the list
          hospitalsList.push({
            filename: item.name,
            downloadURL: downloadURL,
          });
        }

        // Update the state with the list of exported hospitals
        setExportedHospitals(hospitalsList);
      } catch (error) {
        console.error("Error retrieving exported hospitals:", error);
      }
    };

    fetchExportedHospitals();
  }, []);

  const generateShareableLink = (downloadURL: string) => {
    const subject = "Exported Hospital List";
    const body = `Here is the link to download the exported hospital list: ${downloadURL}`;
    const mailtoLink = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    return mailtoLink;
  };

  return (
    <Box
      sx={{ textAlign: "center", p: "4rem", background: "rgb(245, 245, 245)" }}
    >
      <Typography sx={{ textAlign: "center" }} variant="h3">
        Exported Hospitals
      </Typography>
      <Typography variant="body1">
        Here is a list of your exported hospital lists. You can download the CSV
        file or share the link with others.
      </Typography>
      {exportedHospitals ? (
        exportedHospitals.map((hospital) => (
          <Grid
            sx={{
              padding: ".6rem",
              boxShadow: "0 0 2px rgba(0, 0, 0, 0.2)",
              borderRadius: "10px",
              mt: 2,
            }}
            container
            justifyContent="space-between"
            alignItems="center"
            columnGap={2}
            key={hospital.filename}
          >
            <Grid item xs={12} sm={6} md={2} lg={2}>
              {" "}
              <Typography sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                {hospital.filename}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={2} lg={2}>
              {" "}
              <a
                href={hospital.downloadURL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginLeft: "auto" }}
              >
                Download
              </a>
            </Grid>
            <Grid item xs={12} sm={6} md={2} lg={2}>
              {" "}
              <a
                href={generateShareableLink(hospital.downloadURL)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Share
              </a>
            </Grid>
          </Grid>
        ))
      ) : (
        <Typography>No hospitals have been exported yet.</Typography>
      )}
    </Box>
  );
};

export default ExportedList;
