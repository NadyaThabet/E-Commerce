import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../Product/Product";
import Slider from "react-slick";
import img1 from "../../Assets/images/blog-img-1.jpeg";
import img2 from "../../Assets/images/3.jpg";
import img3 from "../../Assets/images/blog-img-2.jpeg";
import img4 from "../../Assets/images/8.jpg";
import img5 from "../../Assets/images/9.jpg";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import Pagination from "react-js-pagination";

export default function Home() {
  const [activePage, setActivePage] = useState(1);
  const [products, setProducts] = useState([]);
  const [results, setResults] = useState(1);

  function handlePageChange(pageNumber) {
    setActivePage(pageNumber);
    getAllProducts(pageNumber);
  }

  async function getAllProducts(pageNumber) {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?page=${pageNumber}`
      );
      setProducts(data);
      setResults(data.results);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    getAllProducts(1);
  }, []);

  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <section className="rounded overflow-hidden mt-3 mb-4">
        <div className="row g-0 mt-3">
          <div className="col-lg-9">
            <Slider {...settings}>
              <img
                src={img1}
                alt="product preview"
                className="w-100"
                height={400}
              />
              <img
                src={img2}
                alt="product preview"
                className="w-100"
                height={400}
              />
              <img
                src={img3}
                alt="product preview"
                className="w-100"
                height={400}
              />
            </Slider>
          </div>
          <div className="col-lg-3 d-lg-block d-none">
            <img
              src={img4}
              alt="product preview"
              height={200}
              className="w-100"
            />
            <img
              src={img5}
              alt="product preview"
              height={200}
              className="w-100"
            />
          </div>
        </div>
      </section>
      <CategoriesSlider />
      <div className="row px-lg-5">
        {products.data?.map((product) => (
          <div
            key={product.id}
            className="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center"
          >
            <Product product={product} />
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center">
        <Pagination
          activePage={activePage}
          itemsCountPerPage={40}
          totalItemsCount={results}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
}
