import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const wishListContext = createContext();

export default function WishListContextProvider({ children }) {
  const [wishList, setWishList] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getLoggedInWishListDetails();
  }, []);

  return (
    <wishListContext.Provider value={{ wishList, setWishList, isLoading }}>
      {children}
    </wishListContext.Provider>
  );
}
