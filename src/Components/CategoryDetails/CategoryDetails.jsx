import axios from "axios";
import React, { useEffect, useState } from "react";
import logo from "../../Assets/images/freshcart-logo.svg";
import { useParams } from "react-router-dom";

export default function CategoryDetails() {
  const { id } = useParams();
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getCategoryDetails() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${id}`
      );
      setCategoryDetails(data.data);
      getSpecificSubCategories(data.data._id);
    } catch (error) {
      console.error("Error fetching category details:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getSpecificSubCategories(categoryId) {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
      );
      setSubCategories(data.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  }

  useEffect(() => {
    getCategoryDetails();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center text-center mt-5 pt-5">
          <img src={logo} alt="logo" width="15%" className="pt-5 mt-5" />
        </div>
      ) : (
        <section className="mx-auto w-75 rounded shadow p-4 category mb-5">
          {categoryDetails ? (
            <div className="row align-items-center g-4">
              <div className="col-md-4">
                <img
                  src={categoryDetails.image}
                  alt="category image"
                  className="w-100 rounded"
                />
              </div>
              <div className="col-md-8">
                <h3>{categoryDetails.name}</h3>
                <h4 className="mt-1 mb-4">SubCategories:</h4>
                {subCategories && subCategories.length > 0 ? (
                  subCategories.map((subcategory) => (
                    <h6
                      key={subcategory._id}
                      className="bg-secondary me-3 text-white p-2 rounded fw-bold"
                    >
                      {subcategory.name}
                    </h6>
                  ))
                ) : (
                  <p className="bg-secondary me-3 text-white p-2 rounded fw-bold">
                    No subcategories available for this category.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <p>No details available for this category.</p>
          )}
        </section>
      )}
    </>
  );
}
