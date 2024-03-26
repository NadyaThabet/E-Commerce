import axios from "axios";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import logo from "../../Assets/images/freshcart-logo.svg";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState(null);

  async function getUserOrders(id) {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/orders/user/" + id
      );
      setOrders(data);
    } catch (error) {
      setError("Error fetching orders. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const { id } = jwtDecode(localStorage.getItem("token"));
    getUserOrders(id);
  }, []);

  return (
    <div className="container mt-5">
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center text-center mt-5 pt-5">
          <img src={logo} alt="logo" width="15%" className="pt-5 mt-5" />
        </div>
      ) : (
        <div>
          <h1 className="text-danger mt-5">Your Orders:</h1>
          {error && <div className="alert alert-danger">{error}</div>}
          {orders?.length === 0 ? (
            <div className="pt-5 mt-5">
              <h2 className="alert alert-warning text-center my-5">
                No order history found
              </h2>
            </div>
          ) : (
            orders?.map((order) => (
              <div key={order.id} className="row mb-4">
                <div className="col-lg-8">
                  <div className="order shadow rounded p-4">
                    <div className="d-flex align-items-center">
                      <h2 className="fw-bolder h1">#{order.id}</h2>
                      <h4 className="fw-bold text-primary mx-4">Processing</h4>
                    </div>
                    <p>You have Ordered {order.cartItems.length} items.</p>
                    <div className="d-flex flex-wrap">
                      {order.cartItems.map((item) => (
                        <img
                          key={item._id}
                          style={{ width: 150, height: 150 }}
                          src={item.product.imageCover}
                          alt="product image"
                          className="img-thumbnail mx-1 my-2"
                        />
                      ))}
                    </div>
                    <hr />
                    <p>
                      <strong>Total Amount: </strong>
                      {order.totalOrderPrice} EGP
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
