import axios from "axios";
import React from "react";
import logo from "../../Assets/images/freshcart-logo.svg";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export default function Categories() {
  function getAllCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, isLoading } = useQuery("categories", getAllCategories);

  return (
    <div className="mt-5 container">
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center text-center mt-5 pt-5">
          <img src={logo} alt="logo" width="15%" className="pt-5 mt-5" />
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4 pt-5 mb-5">
          {data?.data.data.map((category, index) => {
            return (
              <div key={index} className="col">
                <Link
                  to={"/categoryDetails/" + category._id}
                  className="text-decoration-none"
                >
                  <div className="card h-100">
                    <img
                      src={category.image}
                      className="card-img-top"
                      alt="category"
                      height={200}
                    />
                    <div className="card-body">
                      <h6 className="card-text cat-name text-center mt-3">
                        {category.name}
                      </h6>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
