import React, { useContext, useEffect, useState } from "react";
import { wishListContext } from "../../Contexts/WishListContext";
import axios from "axios";
import logo from "../../Assets/images/freshcart-logo.svg";
import WishListProducts from "../WishListProducts/WishListProducts";
import Swal from "sweetalert2";

export default function WishList() {
  const [wishList, setWishList] = useState({});
  const { setWishList: contextSetWishList } = useContext(wishListContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isInWishlist, setIsInWishlist] = useState(false);

  async function getLoggedInWishListDetails() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setWishList(data);
    } catch (error) {}
    setIsLoading(false);
  }

  useEffect(() => {
    getLoggedInWishListDetails();
  }, []);

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
          const { data } = await axios.delete(
            "https://ecommerce.routemisr.com/api/v1/wishlist/" + productId,
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
          contextSetWishList(data);
          setIsInWishlist(false);
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your product has been deleted from wishlist.",
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

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center text-center mt-5 pt-5">
          <img src={logo} alt="logo" width="15%" className="pt-5 mt-5" />
        </div>
      ) : wishList.data?.length > 0 ? (
        <div className="my-5 container">
          {wishList.data?.map((wishListProduct, id) => (
            <WishListProducts
              key={id}
              wishListProduct={wishListProduct}
              removeWishListProduct={removeWishListProduct}
            />
          ))}
        </div>
      ) : (
        <div className="pt-5 mt-5 container">
          <h2 className="alert alert-warning text-center my-5">
            No products in your wishlist
          </h2>
        </div>
      )}
    </>
  );
}
