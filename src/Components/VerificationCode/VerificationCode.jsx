import axios from "axios";
import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export default function VerificationCode() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    verificationCode: Yup.string().required("verification code is required"),
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
      verificationCode: "",
    },
    onSubmit: async () => {
      setErrorMessage("");
      try {
        await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
          {
            verificationCode: values.verificationCode,
          }
        );
        navigate("/resetpassword");
      } catch (error) {
        setErrorMessage(
          "There was an error verifying reset code. Please try again later!"
        );
      }
    },
    validationSchema,
  });

  return (
    <div className="w-50 m-auto my-5 pt-5">
      <form className="mt-5" onSubmit={handleSubmit}>
        <label htmlFor="verifyCode" className="my-1">
          Verify Code :
        </label>
        <input
          type="text"
          className="form-control mb-3"
          id="verificationCode"
          name="verificationCode"
          value={values.verificationCode}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.verificationCode && touched.verificationCode && (
          <p className="alert alert-danger">{errors.verificationCode}</p>
        )}
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        <div className="btn-div d-flex justify-content-end">
          <button
            type="submit"
            disabled={!isValid}
            className="btn bg-main px-3 text-white ms-auto d-block"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
