import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState({});

  async function getLoggedInCartDetails() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setCart(data);
    } catch (error) {}
  }

  useEffect(() => {
    getLoggedInCartDetails();
  }, []);

  return (
    <cartContext.Provider value={{ cart, setCart }}>
      {children}
    </cartContext.Provider>
  );
}
