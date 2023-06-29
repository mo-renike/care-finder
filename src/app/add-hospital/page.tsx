"use client";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownIt from "markdown-it";
import Head from "next/head";

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
      <Head>
        <title>Add Hospitals | CareFinder</title>
        <meta
          name="description"
          content="Add hospitals to the list of hospitals on the platform"
        />
      </Head>
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
    </Box>
  );
};

export default Page;
