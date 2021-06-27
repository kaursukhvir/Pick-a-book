import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { cartActions, cartBoxActions } from "./store/index";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

let initialVal = false;

const getCartData = async () => {
  const response = await fetch(
    "https://meals-7ca17-default-rtdb.firebaseio.com/cart.json"
  );
  if (!response.ok) throw new Error("Could not get data");
  const data = await response.json();
  return data;
};

function App() {
  const cartShow = useSelector((state) => state.cart.cartShow);
  const cart = useSelector((state) => state.cartBox);
  const notification = useSelector((state) => state.cart.notification);
  const dispatch = useDispatch();

  const fetchData = () => {
    try {
      getCartData().then((data) => {
        console.log(data);
        dispatch(
          cartBoxActions.replaceCart({
            items: data.items || [],
            totalQuantity: data.totalQuantity,
          })
        );
      });
    } catch (err) {
      dispatch(
        cartActions.showNotification({
          status: "error",
          title: "Error",
          message: "cannot fetch cart data",
        })
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const cartData = async () => {
      dispatch(
        cartActions.showNotification({
          status: "pending",
          title: "sending..",
          message: "sending cart data",
        })
      );
      const response = await fetch(
        "https://meals-7ca17-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) throw new Error("sending data failed");

      dispatch(
        cartActions.showNotification({
          status: "success",
          title: "success",
          message: "sent cart data successfullly",
        })
      );
    };

    if (!initialVal) {
      initialVal = true;
      return;
    }
    if (cart.changed) {
      cartData().catch((err) => {
        dispatch(
          cartActions.showNotification({
            status: "error",
            title: "Error!",
            message: "could'nt send cart data",
          })
        );
      });
    }

    /*fetch("https://meals-7ca17-default-rtdb.firebaseio.com/cart.json", {
      method: "PUT",
      body: JSON.stringify(cart),
    })
      .then((response) => {
        response.json();
      })
      .then((responseData) => console.log(responseData));*/
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {cartShow && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
