import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { useParams } from "react-router-dom";

function Address() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState();
  let { cartId } = useParams();

  const validationSchema = Yup.object({
    details: Yup.string().required("Details is required"),
    city: Yup.string().required("City is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^01[0125][0-9]{8}$/, "Enter a valid phone number"),
  });

  async function onSubmit() {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
          params: {
            url: "https://nadyathabet.github.io/E-Commerce/#",
          },
        }
      );
      window.open(data.session.url, "_self");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

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
      details: "",
      city: "",
      phone: "",
    },
    onSubmit,
    validationSchema,
  });

  return (
    <form onSubmit={handleSubmit} className="w-75 m-auto mt-5 pt-5">
      <label htmlFor="details" className="my-1">
        Details:
      </label>
      <input
        type="text"
        className="form-control mb-3"
        id="details"
        name="details"
        value={values.details}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.details && touched.details && (
        <p className="alert alert-danger">{errors.details}</p>
      )}

      <label htmlFor="city" className="my-1">
        City:
      </label>
      <input
        type="text"
        className="form-control mb-3"
        id="city"
        name="city"
        value={values.city}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.city && touched.city && (
        <p className="alert alert-danger">{errors.city}</p>
      )}

      <label htmlFor="phone" className="my-1">
        Phone:
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

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      {isLoading ? (
        <button
          type="button"
          className="btn bg-main px-4 text-white ms-auto d-block mb-4"
          disabled
        >
          <i className="fas fa-spin fa-spinner"></i>
        </button>
      ) : (
        <button
          type="submit"
          disabled={isLoading || !isValid}
          className="btn bg-main px-3 text-white ms-auto d-block mb-4"
        >
          Checkout
        </button>
      )}
    </form>
  );
}

export default Address;
