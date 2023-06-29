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

const Page = () => {
  const { currentUser } = useContext(AppContext);
  const [toggle, setToggle] = useState(true);
  const toggleForm = () => {
    setToggle(!toggle);
  };

  const signInFormik = useFormik<FormValues>({
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
    },
  });

  const signUpFormik = useFormik<FormValues>({
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
    },
  });

  const getFieldError = (field: keyof FormValues) =>
    signUpFormik.touched[field] && signUpFormik.errors[field];

  const handleSignUp = () => {
    signUpFormik.handleSubmit();
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
        {toggle ? (
          <form
            onSubmit={signUpFormik.handleSubmit}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Typography variant="h3">Sign Up</Typography>
            <Typography sx={{ mb: 2 }}>
              Please fill in this form to create an account.
            </Typography>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              onChange={signUpFormik.handleChange}
              onBlur={signUpFormik.handleBlur}
              value={signUpFormik.values.name}
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
              onChange={signUpFormik.handleChange}
              onBlur={signUpFormik.handleBlur}
              value={signUpFormik.values.email}
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
              onChange={signUpFormik.handleChange}
              onBlur={signUpFormik.handleBlur}
              value={signUpFormik.values.password}
              sx={{
                my: 2,
                borderColor: getFieldError("password") ? "red" : undefined,
              }}
            />
            {getFieldError("password") && (
              <span className="error">{getFieldError("password")}</span>
            )}

            <button onClick={handleSignUp}>Sign Up</button>
            <Box
              sx={{
                display: "flex",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  mt: ".5rem",
                  fontSize: ".7rem",
                }}
              >
                Already have an account?
              </Typography>
              <Button
                variant="text"
                sx={{
                  fontSize: ".7rem",
                  textTransform: "capitalize",
                  color: "rgba(120, 170, 145)",
                }}
                onClick={toggleForm}
              >
                Login
              </Button>
            </Box>
          </form>
        ) : (
          <form
            onSubmit={signInFormik.handleSubmit}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Typography variant="h3">Login</Typography>
            <Typography sx={{ mb: 2 }}>
              Please log in to your account.
            </Typography>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              onChange={signInFormik.handleChange}
              onBlur={signInFormik.handleBlur}
              value={signInFormik.values.email}
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
              onChange={signInFormik.handleChange}
              onBlur={signInFormik.handleBlur}
              value={signInFormik.values.password}
              sx={{
                my: 2,
                borderColor: getFieldError("password") ? "red" : undefined,
              }}
            />
            {getFieldError("password") && (
              <span className="error">{getFieldError("password")}</span>
            )}

            <button onClick={handleSignUp}>Login</button>
            <Box
              sx={{
                display: "flex",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  mt: ".5rem",
                  fontSize: ".7rem",
                }}
              >
                New User?
              </Typography>
              <Button
                variant="text"
                sx={{
                  fontSize: ".7rem",
                  textTransform: "capitalize",
                  color: "rgba(120, 170, 145)",
                }}
                onClick={toggleForm}
              >
                Create an account
              </Button>
            </Box>
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
