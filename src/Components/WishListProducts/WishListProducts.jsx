import React from "react";

export default function WishListProducts({
  wishListProduct,
  removeWishListProduct,
}) {
  return (
    <div className="container mt-5 pt-5">
      <div className="cart-product shadow rounded-2">
        <div className="row align-items-center">
          <div className="col-lg-2 col-md-3 col-sm-4 col-6">
            <img className="w-100" src={wishListProduct.imageCover} alt="" />
          </div>
          <div className="col-lg-8 col-md-6 col-sm-8 col-6">
            <h2>{wishListProduct.title}</h2>
            <h5>{wishListProduct.category?.name}</h5>
            <p className="d-flex justify-content-between">
              <span>{wishListProduct.price} EGP</span>
              <span>
                <i className=" fas fa-star rating-color me-1"></i>{" "}
                <span className="me-5">{wishListProduct.ratingsAverage}</span>
              </span>
            </p>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-12 col-12">
            <span onClick={() => removeWishListProduct(wishListProduct._id)}>
              <i className="fa-solid fa-heart-crack fs-2 text-success d-flex justify-content-center mb-5 pb-5 cursor-pointer"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
