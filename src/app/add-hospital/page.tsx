"use client";
import { Box, Typography, TextField } from "@mui/material";
import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownIt from "markdown-it";
//import { Metadata } from "next";
import { AppContext } from "@/app/AppContext";

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
  if (!values.phone) {
    errors.phone = "Please enter hospital phone number";
  }
  return errors;
};

const mdParser = new MarkdownIt();

const Page: React.FC = () => {
  const { currentUser } = useContext(AppContext);

  const [markdownContent, setMarkdownContent] = useState("");
  const handleEditorChange = ({ text }: { text: string }) => {
    setMarkdownContent(text);
  };

  const Formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      phone: "",
    },
    validate,
    onSubmit: (values) => {
      const hospitalData = {
        ...values,
        content: markdownContent,
      };
      console.log(hospitalData);
    },
  });

  const { handleChange, handleSubmit, values, errors } = Formik;

  return (
    <Box>
      {currentUser ? (
        <Box
          sx={{
            p: 4,
            mt: "7rem",
          }}
        >
          <Typography variant="h3">Add hospitals </Typography>
          <Typography variant="body1">
            Add hospitals to the list of hospitals on the platform
          </Typography>
          <form onSubmit={Formik.handleSubmit}>
            <TextField
              id="name"
              name="name"
              label="Hospital Name"
              value={values.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              id="address"
              name="address"
              label="Hospital Address"
              value={values.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
            />
            <MdEditor
              style={{ height: "500px" }}
              value={markdownContent}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
            />
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
