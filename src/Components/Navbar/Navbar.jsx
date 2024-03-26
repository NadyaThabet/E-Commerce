import React, { useContext } from "react";
import logo from "../../Assets/images/logo_white.png";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../Contexts/AuthContext";
import { cartContext } from "../../Contexts/CartContext";
import { wishListContext } from "../../Contexts/WishListContext";

export default function Navbar() {
  const { userIsLoggedIn, setUserIsLoggedIn } = useContext(authContext);
  const { cart } = useContext(cartContext);
  const { wishList } = useContext(wishListContext);
  const navigate = useNavigate();

  function logOut() {
    setUserIsLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-body">
      <div className="container">
        <Link to={"home"} className="navbar-brand">
          <img src={logo} alt="logo" width="80%" height="50" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to={"home"}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"products"}>
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"categories"}>
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"brands"}>
                Brands
              </Link>
            </li>
            {userIsLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to={"allorders"}>
                  Orders
                </Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {userIsLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link to={"/wishList"} className="nav-link">
                    <i className="fa-solid fa-heart fs-2 text-success position-relative">
                      <span className="position-absolute top-0 start-100 translate-middle bg-dark p-2 rounded-circle font-sm text-white mt-2">
                        {wishList.data?.length || 0}
                      </span>
                    </i>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/cart"} className="nav-link">
                    <i className="fa-solid fa-cart-shopping text-success fs-4 position-relative mt-2 me-3 ms-1">
                      <span className="position-absolute top-0 start-100 translate-middle bg-dark p-2 rounded-circle font-sm text-white">
                        {cart?.numOfCartItems || 0}
                      </span>
                    </i>
                  </Link>
                </li>
                <li className="nav-item">
                  <button onClick={logOut} className="btn btn-outline-danger">
                    LogOut
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to={"login"}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"register"}>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
