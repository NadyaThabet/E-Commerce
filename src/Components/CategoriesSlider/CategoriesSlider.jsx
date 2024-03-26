import axios from "axios";
import React from "react";
import Slider from "react-slick";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export default function CategoriesSlider() {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  function getALlCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data } = useQuery("categories", getALlCategories);

  return (
    <Slider {...settings} className="container">
      {data?.data.data.map((category, index) => {
        return (
          <div key={index} className="container">
            <Link to={"/categoryDetails/" + category._id}>
              {" "}
              <img
                src={category.image}
                className="w-100"
                alt="category"
                height={200}
              />
              <h5 className="cat-name">{category.name}</h5>
            </Link>
          </div>
        );
      })}
    </Slider>
  );
}
