import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { cartContext } from "../../Contexts/CartContext";
import Swal from "sweetalert2";
import axios from "axios";
import { wishListContext } from "../../Contexts/WishListContext";

function Product({ product }) {
  const { setCart } = useContext(cartContext);
  const { wishList, setWishList } = useContext(wishListContext);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const getLoggedInWishListDetails = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setWishList(data);
      setIsInWishlist(
        data && data.data && data.data.some((item) => item._id === product.id)
      );
    } catch (error) {
      console.error("Error fetching wishlist data:", error);
    }
  };

  useEffect(() => {
    getLoggedInWishListDetails();
  }, []);

  async function addProductToCart(productId) {
    try {
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
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  }

  async function addProductToWishList(productId) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setWishList(data);
      setIsInWishlist(true);
      console.log(isInWishlist);

      toast.success(data.message, {
        autoClose: 1500,
        closeOnClick: true,
        pauseOnHover: false,
      });
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  }

  function removeWishListProduct(productId) {
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
          try {
            const { data } = await axios.delete(
              `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
              {
                headers: {
                  token: localStorage.getItem("token"),
                },
              }
            );
            setWishList((prevWishList) => {
              return {
                ...prevWishList,
                data: prevWishList.data.filter(
                  (product) => product._id !== productId
                ),
              };
            });
            setIsInWishlist(false);

            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your product has been deleted from wishlist.",
              icon: "success",
            });
          } catch (error) {
            console.error("Error removing product from wishlist:", error);
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your product isn't deleted :)",
            icon: "error",
          });
        }
      });
  }

  return (
    <div className="product overflow-hidden mb-3 mt-5 px-2 py-3 cursor-pointer w-75">
      <div className="d-flex justify-content-end pe-1">
        {isInWishlist ? (
          <span onClick={() => removeWishListProduct(product.id)}>
            <i className="fa-solid fa-heart-crack wish fs-1" role="button"></i>
          </span>
        ) : (
          <span onClick={() => addProductToWishList(product.id)}>
            <i className="fa-solid fa-heart wish fs-1" role="button"></i>
          </span>
        )}
      </div>
      <Link to={"/productDetails/" + product.id} className="a">
        <img className="w-100 mb-4" src={product.imageCover} alt="imageCover" />
        <h5 className="font-sm text-main">{product.category.name}</h5>
        <h4>{product.title.split(" ").slice(0, 2).join(" ")}</h4>
        <p className="d-flex justify-content-between">
          <span>{product.price} EGP</span>
          <span>
            <i className="fas fa-star rating-color me-1"></i>
            {product.ratingsAverage}
          </span>
        </p>
      </Link>
      <button
        onClick={() => addProductToCart(product.id)}
        className="btn bg-main text-white w-100 "
      >
        +Add To Cart
      </button>
    </div>
  );
}

export default Product;
