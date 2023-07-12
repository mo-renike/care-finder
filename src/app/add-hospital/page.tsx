"use client";
import { Box, Typography, TextField } from "@mui/material";
import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownIt from "markdown-it";
//import { Metadata } from "next";
import { AppContext } from "@/app/AppContext";
import { toast } from "react-toastify";

// export const metadata: Metadata = {
//   title: "Add Hospitals | CareFinder",
// };
interface FormValues {
  name: string;
  address: string;
  phone: string;
}

const validate = (values: FormValues) => {
  const errors: Partial<FormValues> = {};
  if (!values.name) {
    errors.name = "Please enter hospital name";
  }
  if (!values.address) {
    errors.address = "Please enter hospital address";
  }
  return errors;
};

const mdParser = new MarkdownIt();

const Page: React.FC = () => {
  const { currentUser, setHospitals } = useContext(AppContext);

  const [markdownContent, setMarkdownContent] = useState("");
  const handleEditorChange = ({ text }: { text: string }) => {
    setMarkdownContent(text);
  };
  const handleSubmit = () => {
    const { name, address } = values;

    const newHospital: Hospital = {
      name,
      address,
      location: "",
      id: name,
      formatted_phone_number: undefined,
      formatted_address: undefined,
      business_status: "",
      wheelchair_accessible_entrance: false,
      opening_hours: {
        open_now: false,
      },
      place_id: "",
      price_level: 0,
      reference: "",
      user_ratings_total: 0,
      vicinity: "",
      wheelchair_accessible: false,
    };
    setHospitals((prev) => [...prev, newHospital]);

    toast.success("Hospital added successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    Formik.resetForm();
  };

  const Formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      phone: "",
    },
    validate,
    onSubmit: handleSubmit,
  });

  const { handleChange, values, errors } = Formik;

  return (
    <Box>
      {currentUser ? (
        <Box
          sx={{
            p: 4,
            margin: "auto",
            maxWidth: "600px",
            boxShadow: "0 0 3px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            mt: "7rem",
          }}
        >
          <Typography variant="h3">Add hospitals </Typography>
          <Typography variant="body1">
            Add hospitals to the list of hospitals on the platform
          </Typography>
          <form
            onSubmit={Formik.handleSubmit}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <TextField
              id="name"
              name="name"
              label="Hospital Name"
              value={values.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              sx={{ my: 1 }}
            />
            <TextField
              id="address"
              name="address"
              label="Hospital Address"
              value={values.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
              sx={{ my: 1 }}
            />
            {/* <MdEditor
              style={{ height: "500px" }}
              value={markdownContent}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
            /> */}
            <button style={{ margin: "1rem 0" }} type="submit">
              Submit
            </button>
          </form>
        </Box>
      ) : (
        <Box sx={{ mt: "7rem", ml: "3rem" }}>
          <Typography variant="body1">Please login to add hospitals</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Page;
