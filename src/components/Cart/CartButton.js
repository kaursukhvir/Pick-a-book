import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/index";

import classes from "./CartButton.module.css";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cartBox.totalQuantity);
  const cartToggleHandler = () => dispatch(cartActions.cartToggle());
  return (
    <button className={classes.button} onClick={cartToggleHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
