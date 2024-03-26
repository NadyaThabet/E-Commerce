import { Navigate, RouterProvider, createHashRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import NotFound from "./Components/Not Found/NotFound";
import Cart from "./Components/Cart/Cart";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Home from "./Components/Home/Home";
import ProductDetails from "./Components/Product Details/ProductDetails";
import CategoryDetails from "./Components/CategoryDetails/CategoryDetails";
import WishList from "./Components/WishList/WishList";
import Orders from "./Components/Orders/Orders";
import Address from "./Components/Address/Address";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import VerificationCode from "./Components/VerificationCode/VerificationCode";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import ProtectedRoute from "./Components/Protected Route/ChildrenProtectedRoute";
import AuthProtectedRoute from "./Components/Protected Route/AuthProtectedRoute";
import AuthContextProvider from "./Contexts/AuthContext";
import CartContextProvider from "./Contexts/CartContext";
import WishListContextProvider from "./Contexts/WishListContext";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  const queryClinet = new QueryClient();
  const routers = createHashRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Navigate to={"home"} />,
        },
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "categoryDetails/:id",
          element: <CategoryDetails />,
        },
        {
          path: "brands",
          element: <Brands />,
        },
        {
          path: "productDetails/:id",
          element: <ProductDetails />,
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "wishList",
          element: (
            <ProtectedRoute>
              <WishList />
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          ),
        },
        {
          path: "address/:cartId",
          element: (
            <ProtectedRoute>
              <Address />
            </ProtectedRoute>
          ),
        },
        {
          path: "register",
          element: (
            <AuthProtectedRoute>
              <Register />
            </AuthProtectedRoute>
          ),
        },
        {
          path: "login",
          element: (
            <AuthProtectedRoute>
              <Login />
            </AuthProtectedRoute>
          ),
        },
        {
          path: "forgotpassword",
          element: (
            <AuthProtectedRoute>
              <ForgotPassword />
            </AuthProtectedRoute>
          ),
        },
        {
          path: "verificatincode",
          element: (
            <AuthProtectedRoute>
              <VerificationCode />
            </AuthProtectedRoute>
          ),
        },
        {
          path: "resetpassword",
          element: (
            <AuthProtectedRoute>
              <ResetPassword />
            </AuthProtectedRoute>
          ),
        },

        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <QueryClientProvider client={queryClinet}>
        <AuthContextProvider>
          <CartContextProvider>
            <WishListContextProvider>
              <RouterProvider router={routers}></RouterProvider>
            </WishListContextProvider>
          </CartContextProvider>
        </AuthContextProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>

      <ToastContainer />
    </>
  );
}

export default App;
