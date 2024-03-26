/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { toast } from "react-toastify";
import { cartContext } from "../../Contexts/CartContext";
import logo from "../../Assets/images/freshcart-logo.svg";

function ProductDetails(product) {
  const { setCart } = useContext(cartContext);

  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const { id } = useParams();
  const [productDetails, setProductDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getSpecificProduct() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products/" + id
      );
      setProductDetails(data.data);
      toast.success(data.message, {
        autoClose: 1500,
        closeOnClick: true,
        pauseOnHover: false,
      });
    } catch (error) {
      toast.error("Error fetching product. Please try again.", {
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: false,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function addProductToCart(productId) {
    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        productId,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setCart(data);
    toast.success(data.message, {
      autoClose: 1500,
      closeOnClick: true,
      pauseOnHover: false,
    });
    console.log(data);
  }

  useEffect(() => {
    getSpecificProduct();
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <div className="d-flex justify-content-center align-items-center text-center mt-5 pt-5">
            <img src={logo} alt="logo" width="15%" className="pt-5 mt-5" />
          </div>
        </>
      ) : (
        <div className="row align-items-center justify-content-center mb-5 py-5">
          <div className="col-md-3 mt-5">
            <Slider {...settings}>
              {productDetails.images?.map((img, index) => {
                return (
                  <img
                    key={index}
                    src={img}
                    alt="product preview"
                    className="w-100"
                  />
                );
              })}
            </Slider>
          </div>
          <div className="col-md-6">
            <h2 className="mt-2">{productDetails?.title}</h2>
            <h5 className="font-sm text-main mt-2">
              {productDetails?.category?.name}
            </h5>
            <p className="mt-2">{productDetails?.description}</p>
            <p className="d-flex justify-content-between mt-2">
              <span>{productDetails?.price} EGP</span>
              <span>
                <i className="fas fa-star rating-color me-1"></i>
                <span>{productDetails?.ratingsAverage}</span>
              </span>
            </p>
            <button
              onClick={() => addProductToCart(productDetails.id)}
              className="btn bg-main text-white w-100 mt-2"
            >
              Add To Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
