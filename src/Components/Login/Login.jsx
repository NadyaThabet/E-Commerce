import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../Contexts/AuthContext";

export default function Login() {
  const { setUserIsLoggedIn } = useContext(authContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Z]+$/i,
        "Enter a valid email"
      ),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&])[a-zA-Z0-9!@#$%^&]{8,18}$/,
        "Password must contain at least 8 characters & not more than 18 characters , 1 special characters & numbers "
      ),
  });

  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    isValid,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async () => {
      setErrorMessage("");
      try {
        setIsLoading(true);
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          values
        );
        if (data.token) {
          setUserIsLoggedIn(true);
          localStorage.setItem("token", data.token);
          navigate("/home");
        } else {
          setErrorMessage("Login failed. Please check your credentials.");
        }
      } catch (error) {
        setErrorMessage(
          "An error occurred during login. Please try again later."
        );
      }
      setIsLoading(false);
    },
    validationSchema,
  });

  return (
    <>
      <div className="w-75 m-auto my-5 pt-5">
        <h1>Login Now :</h1>
        <form className="mt-5" onSubmit={handleSubmit}>
          <label htmlFor="email" className="my-1">
            Email:
          </label>
          <input
            type="email"
            className="form-control mb-3"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email && (
            <p className="alert alert-danger">{errors.email}</p>
          )}

          <label htmlFor="password" className="my-1">
            Password:
          </label>
          <div className="password-input-container d-flex position-relative">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control mb-3"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <i
              onClick={(e) => {
                setShowPassword(!showPassword);
              }}
              role="button"
              className={`fa-solid ${
                showPassword ? "fa-eye-slash" : "fa-eye"
              } position-absolute end-0 translate-middle-y me-2 eye`}
            ></i>
          </div>
          {errors.password && touched.password && (
            <p className="alert alert-danger">{errors.password}</p>
          )}

          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          {isLoading ? (
            <div className="btn-div d-flex justify-content-end">
              <button
                type="button"
                className="btn bg-main px-4 text-white ms-auto d-block"
                disabled
              >
                <i className="fas fa-spin fa-spinner"></i>
              </button>
            </div>
          ) : (
            <div className="btn-div d-flex justify-content-center">
              <Link to={"/forgotpassword"} className="me-3">
                <a className="text-decoration-underline text-primary">
                  Forgot Password?
                </a>
              </Link>
              <button
                type="submit"
                disabled={!isValid}
                className="btn bg-main px-3 text-white ms-auto d-block"
              >
                Login
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
