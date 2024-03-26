import React, { useState } from "react";

export default function CartProducts({
  cartProduct,
  removeCartProduct,
  updateProductsCount,
}) {
  const [count, setCount] = useState(cartProduct.count);

  return (
    <div className="container">
      <div className="cart-product shadow rounded-2 my-3">
        <div className="row align-items-center">
          <div className="col-lg-2 col-md-3">
            <img
              className="w-100"
              src={cartProduct.product?.imageCover}
              alt=""
            />
          </div>
          <div className="col-lg-8 col-md-7 px-4">
            <h2>{cartProduct.product?.title}</h2>
            <h5>{cartProduct.product?.category.name}</h5>
            <p className="d-flex justify-content-between align-items-center">
              <span>{cartProduct.price} EGP</span>
              <span>
                <i className="fas fa-star rating-color me-1"></i>{" "}
                {cartProduct.product?.ratingsAverage}
              </span>
            </p>
            <p>
              <span className="fw-bolder">Total Price:</span>{" "}
              {cartProduct.count * cartProduct.price} EGP
            </p>
          </div>
          <div className="col-lg-2 col-md-2">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <button
                onClick={() => removeCartProduct(cartProduct.product?._id)}
                className="btn btn-outline-danger mb-3 me-3"
              >
                Remove
              </button>
              <div className="d-flex justify-content-center align-items-center mb-3">
                <button
                  onClick={() => {
                    if (count > 1) {
                      updateProductsCount(cartProduct.product?._id, count - 1);
                      setCount(count - 1);
                    }
                  }}
                  className="btn bg-main text-white mx-2"
                >
                  -
                </button>
                <span>{count}</span>
                <button
                  onClick={() => {
                    updateProductsCount(cartProduct.product?._id, count + 1);
                    setCount(count + 1);
                  }}
                  className="btn bg-main text-white me-4 ms-2"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
