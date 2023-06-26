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
  Button,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
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
import { AppContext } from "../AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  setCurrentUser: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: any;
}
const Page = (props: loginProps) => {
  const { currentUser } = useContext(AppContext);
  const [toggle, setToggle] = useState(true);
  const toggleForm = () => {
    setToggle(!toggle);
  };
  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validate,
    onSubmit: async (values) => {
      toast.success(`Welcome, ${values.name}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      if (currentUser) {
        // Handle login
        await emailSignIn(values.email, values.password);
        toast.success("Login Successful!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        // Handle sign up
        await emailSignUp(values.email, values.password);
        toast.success("Sign Up Successful!", {
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
    },
  });

  const getFieldError = (field: keyof FormValues) =>
    formik.touched[field] && formik.errors[field];

  const handleSignUp = () => {
    emailSignUp(formik.values.email, formik.values.password);
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
        {toggle ? (
          <form
            onSubmit={formik.handleSubmit}
            style={{ display: "flex", flexDirection: "column" }}
          >
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

            <button onClick={handleSignUp}>Sign Up</button>
            <Typography
              sx={{ display: "flex", mt: ".5rem", fontSize: ".8rem" }}
            >
              <span>
                Already have an account?{" "}
                <Button
                  variant="text"
                  sx={{
                    fontSize: ".7rem",
                    ml: 2,
                    color: "rgba(120, 170, 145)",
                  }}
                  onClick={toggleForm}
                >
                  Login
                </Button>
              </span>
            </Typography>
          </form>
        ) : (
          <form
            onSubmit={formik.handleSubmit}
            style={{ display: "flex", flexDirection: "column" }}
          >
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

            <button onClick={handleSignUp}>Login</button>
            <Typography
              sx={{ display: "flex", mt: ".5rem", fontSize: ".8rem" }}
            >
              <span>
                New User?
                <Button
                  variant="text"
                  sx={{
                    fontSize: ".7rem",
                    ml: 2,
                    color: "rgba(120, 170, 145)",
                  }}
                  onClick={toggleForm}
                >
                  Create an account
                </Button>
              </span>
            </Typography>
          </form>
        )}
        {/* {currentUser && (
          <Typography sx={{ display: "flex", mt: ".5rem", fontSize: ".8rem" }}>
            Forgot your password?{" "}
            <Link href="/reset-password">Reset Password</Link>
          </Typography>
        )} */}
        <Typography
          sx={{
            display: "flex",
            mt: ".5rem",
            fontSize: "1.2rem",
            fontWeight: "bold",
            my: 3,
            mx: "auto",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Or
        </Typography>

        <button
          type="button"
          className="button"
          style={{ width: "100%", padding: ".5rem" }}
          onClick={signInWithGoogle}
        >
          <FcGoogle style={{ marginRight: "1rem", fontSize: "1.5rem" }} />
          <Typography> Sign in with Google</Typography>
        </button>
      </Box>
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

export default Page;
