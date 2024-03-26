import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import CartProducts from "../CartProducts/CartProducts";
import logo from "../../Assets/images/freshcart-logo.svg";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { cartContext } from "../../Contexts/CartContext";

export default function Cart() {
  const [cart, setCart] = useState({});
  const { setCart: contextSetCart } = useContext(cartContext);
  const [isLoading, setIsLoading] = useState(true);
  const [timeOutId, setTimeOutId] = useState();
  const [cartId, setCartId] = useState();

  async function getLoggedInCartDetails() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setCartId(data.data._id);
      setCart(data);
    } catch (error) {}
    setIsLoading(false);
  }

  useEffect(() => {
    getLoggedInCartDetails();
  }, []);

  function removeCartProduct(productId) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await axios.delete(
            "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
            {
              headers: {
                token: localStorage.getItem("token"),
              },
            }
          );
          setCart(data);
          contextSetCart(data);
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your product has been deleted.",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your product isn't deleted :)",
            icon: "error",
          });
        }
      });
  }

  function clearCart() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await axios.delete(
            "https://ecommerce.routemisr.com/api/v1/cart",
            {
              headers: {
                token: localStorage.getItem("token"),
              },
            }
          );
          setCart(data);
          contextSetCart({});
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your cart is empty.",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your cart is not cleared :)",
            icon: "error",
          });
        }
      });
  }

  function updateProductsCount(productId, count) {
    clearTimeout(timeOutId);
    setTimeOutId(
      setTimeout(async () => {
        if (count === 0) {
          removeCartProduct(productId);
        } else {
          const { data } = await axios.put(
            "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
            {
              count,
            },
            {
              headers: {
                token: localStorage.getItem("token"),
              },
            }
          );
          setCart(data);
        }
      }, 500)
    );
  }

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center text-center mt-5 pt-5">
          <img src={logo} alt="logo" width="15%" className="pt-5 mt-5" />
        </div>
      ) : cart.data?.products.length > 0 ? (
        <div className="my-5 container">
          <button
            onClick={() => clearCart()}
            className="btn btn-outline-danger clr-btn d-block ms-auto"
          >
            Clear Cart
          </button>

          {cart.data?.products.map((cartProduct, index) => (
            <CartProducts
              key={index}
              cartProduct={cartProduct}
              removeCartProduct={removeCartProduct}
              updateProductsCount={updateProductsCount}
            />
          ))}

          <div className="d-flex justify-content-between">
            <Link
              to={"/address/" + cartId}
              className="btn bg-main text-white"
              href="ss"
            >
              CheckOut
            </Link>
            <p>Total cart Price: {cart.data?.totalCartPrice}</p>
          </div>
        </div>
      ) : (
        <div className="pt-5 mt-5 container">
          <h2 className="alert alert-warning text-center my-5">
            No products in your cart
          </h2>
        </div>
      )}
    </>
  );
}
