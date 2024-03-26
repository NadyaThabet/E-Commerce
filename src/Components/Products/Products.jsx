import React from "react";
import axios from "axios";
import Product from "../Product/Product";
import logo from "../../Assets/images/freshcart-logo.svg";
import { useQuery } from "react-query";

export default function Products() {
  function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isLoading } = useQuery("products", getAllProducts);

  return (
    <div className="container">
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center text-center mt-5 pt-5">
          <img src={logo} alt="logo" width="15%" className="pt-5 mt-5" />
        </div>
      ) : (
        <div className="row px-2 px-md-5 mt-5">
          {data?.data?.data.map((product, index) => (
            <div
              key={product._id || index}
              className="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center"
            >
              <Product product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
