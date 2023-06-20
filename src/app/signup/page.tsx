"use client";

import {
  Box,
  Grid,
  TextField,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React, { useContext } from "react";
import {
  emailSignIn,
  emailSignUp,
  signInWithGoogle,
} from "@/app/services/firebase/firebase";
import Link from "next/link";
import Image from "next/image";
import loginImg from "@/assets/stethoscope.jpg";
import { useFormik } from "formik";
import { FcGoogle } from "react-icons/fc";
import { AppContext } from "../theme-provider";

interface FormValues {
  email: string;
  password: string;
  name: string;
}

const validate = (values: FormValues) => {
  const errors: Partial<FormValues> = {};
  if (!values.email) {
    errors.email = "Email is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Password is Required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }
  if (!values.name) {
    errors.name = "Please enter your name";
  }
  return errors;
};

interface loginProps {
  setCurrentUser: any;
  currentUser: null;
}
const Page = (props: loginProps) => {
  const { setCurrentUser, currentUser } = useContext<{}>(AppContext);

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validate,
    onSubmit: async (values) => {
      console.log(values, "values");
      if (currentUser) {
        // Handle login
        await emailSignIn(values.email, values.password);
      } else {
        // Handle sign up
        await emailSignUp(values.email, values.password);
        console.log("sign up successful");
      }
    },
  });

  const getFieldError = (field: keyof FormValues) =>
    formik.touched[field] && formik.errors[field];

  const handleToggleForm = () => {
    setCurrentUser(!currentUser); // Toggle authentication status
    formik.resetForm(); // Reset form values
  };

  return (
    <Box>
      <Box
        sx={{
          p: 4,
          margin: "auto",
          maxWidth: "450px",
          boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
          mt: "7rem",
        }}
      >
        <Typography variant="h4">
          {currentUser ? "Login" : "Sign Up"}
        </Typography>
        <Typography sx={{ mb: 2 }}>
          {currentUser
            ? "Please log in to your account."
            : "Please fill in this form to create an account."}
        </Typography>
        <form
          onSubmit={formik.handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          {!currentUser && (
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              sx={{
                my: 2,
                borderColor: getFieldError("name") ? "red" : undefined,
              }}
            />
          )}
          {getFieldError("name") && (
            <span className="error">{getFieldError("name")}</span>
          )}

          <TextField
            id="email"
            label="Email"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            sx={{
              my: 2,
              borderColor: getFieldError("email") ? "red" : undefined,
            }}
          />
          {getFieldError("email") && (
            <span className="error">{getFieldError("email")}</span>
          )}

          <TextField
            id="password"
            label="Password"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            sx={{
              my: 2,
              borderColor: getFieldError("password") ? "red" : undefined,
            }}
          />
          {getFieldError("password") && (
            <span className="error">{getFieldError("password")}</span>
          )}

          <button type="submit">{currentUser ? "Login" : "Sign Up"}</button>
          <Typography sx={{ display: "flex", mt: ".5rem", fontSize: ".8rem" }}>
            {!!currentUser ? (
              <span>
                You do not have an account? <Link href="/signup">Sign Up</Link>
              </span>
            ) : (
              <span>
                Already have an account? <Link href="/login">Login</Link>
              </span>
            )}
          </Typography>

          <Typography
            sx={{
              display: "flex",
              mt: ".5rem",
              fontSize: "1.2rem",
              fontWeight: "bold",
              my: 3,
              mx: "auto",
            }}
          >
            Or
          </Typography>

          <button type="button" className="button" onClick={signInWithGoogle}>
            <FcGoogle style={{ marginRight: "2rem", fontSize: "1.5rem" }} />{" "}
            Sign in with Google
          </button>
        </form>
        {currentUser && (
          <Typography sx={{ display: "flex", mt: ".5rem", fontSize: ".8rem" }}>
            Forgot your password?{" "}
            <Link href="/reset-password">Reset Password</Link>
          </Typography>
        )}
        <Typography
          sx={{ display: "flex", mt: ".5rem", fontSize: ".8rem" }}
          onClick={handleToggleForm}
        >
          {currentUser ? "Create an account" : "Already have an account?"}
        </Typography>
      </Box>
    </Box>
  );
};

export default Page;
