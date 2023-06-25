import { useState, useEffect } from "react";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "@/app/services/firebase/firebase";
import { Box, Typography } from "@mui/material";

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
          console.log(downloadURL, "downloadURL");

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
      <ul>
        {exportedHospitals ? (
          exportedHospitals.map((hospital) => (
            <li
              style={{
                display: "flex",
                margin: ".8rem 0",
                boxShadow: "0 0 2px rgba(0, 0, 0, 0.2)",
                borderRadius: "10px",
                padding: ".6rem",
                justifyContent: "space-between",
                alignItems: "center",
                width: "auto",
              }}
              key={hospital.filename}
            >
              <Typography sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                {hospital.filename}
              </Typography>

              <a
                href={hospital.downloadURL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginLeft: "auto" }}
              >
                Download
              </a>
              <a
                href={generateShareableLink(hospital.downloadURL)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Share
              </a>
            </li>
          ))
        ) : (
          <Typography>No hospitals have been exported yet.</Typography>
        )}
      </ul>
    </Box>
  );
};

export default ExportedList;
