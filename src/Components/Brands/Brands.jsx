import axios from "axios";
import React from "react";
import logo from "../../Assets/images/freshcart-logo.svg";
import { useQuery } from "react-query";

export default function Brands() {
  function getAllBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const { data, isLoading } = useQuery("brands", getAllBrands);

  return (
    <div className="mt-5 container">
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center text-center mt-5 pt-5">
          <img src={logo} alt="logo" width="15%" className="pt-5 mt-5" />
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 pt-5 mb-5">
          {data?.data.data.map((brand, index) => (
            <div key={index} className="col">
              <div className="card h-100">
                <img src={brand.image} className="card-img-top" alt="brand" />
                <div className="card-body">
                  <h5 className="card-title brand">{brand.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
