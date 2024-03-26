import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "min length must be 3 characters.")
      .max(20, "max length must be 20 characters."),
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
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "Passwords don't match"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^01[0125][0-9]{8}$/, "Enter a valid phone number"),
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
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: async () => {
      setErrorMessage("");
      try {
        setIsLoading(true);
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signup",
          values
        );
        if (data.message === "success") {
          navigate("/login");
        }
      } catch (error) {
        setErrorMessage(error.response.data.message);
      }
      setIsLoading(false);
    },
    validationSchema,
  });

  return (
    <>
      <div className="w-75 m-auto my-5">
        <h1>Register Now :</h1>
        <form className="mt-5" onSubmit={handleSubmit}>
          <label htmlFor="name" className="my-1">
            Name:
          </label>
          <input
            type="text"
            className="form-control mb-3"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          {errors.name && touched.name && (
            <p className="alert alert-danger">{errors.name}</p>
          )}

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

          <label htmlFor="rePassword" className="my-1">
            RePassword:
          </label>
          <div className="password-input-container d-flex position-relative">
            <input
              type={showRePassword ? "text" : "password"}
              className="form-control mb-3"
              id="rePassword"
              name="rePassword"
              value={values.rePassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <i
              onClick={(e) => {
                setShowRePassword(!showRePassword);
              }}
              role="button"
              className={`fa-solid ${
                showRePassword ? "fa-eye-slash" : "fa-eye"
              } position-absolute end-0 translate-middle-y me-2 eye`}
            ></i>
          </div>

          {errors.rePassword && touched.rePassword && (
            <p className="alert alert-danger">{errors.rePassword}</p>
          )}

          <label htmlFor="phone" className="my-1">
            phone:
          </label>
          <input
            type="tel"
            className="form-control mb-3"
            id="phone"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          {errors.phone && touched.phone && (
            <p className="alert alert-danger">{errors.phone}</p>
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
            <div className="btn-div d-flex justify-content-end">
              <button
                type="submit"
                disabled={!isValid}
                className="btn bg-main px-3 text-white ms-auto d-block"
              >
                Register
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
