import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email"),
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
    },
    onSubmit: async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const { data } = await axios.post(
          "https://route-ecommerce.onrender.com/api/v1/forgotPasswords",
          {
            email: values.email,
          }
        );
        console.log(data);
        navigate("/verificationcode");
      } catch (error) {
        setErrorMessage(
          "There was an error sending reset code. Please try again later!"
        );
      }
      setIsLoading(false);
    },
    validationSchema,
  });

  const clearErrorMessage = () => {
    setErrorMessage("");
  };

  return (
    <div className="w-50 m-auto my-5 pt-5">
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
          onChange={(e) => {
            handleChange(e);
            clearErrorMessage();
          }}
          onBlur={handleBlur}
        />

        {errors.email && touched.email && (
          <p className="alert alert-danger">{errors.email}</p>
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
              Next
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
