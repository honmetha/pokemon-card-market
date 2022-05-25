import * as React from "react";
import { IoCloseOutline } from "react-icons/io5";

import Button from "./Button";
import CartItem from "./CartItem";
import { IPokemon } from "../types/interfaces";
import { currencyFormatter } from "../utils/currencyFormatter";

interface DrawerProps {
  children: React.ReactNode;
  cart: IPokemon[];
  handleClearCart: () => void;
  handleAddQuantity: (targetCard: IPokemon) => void;
  handleMinusQuantity: (targetCard: IPokemon) => void;
}

const Drawer = ({
  children,
  cart,
  handleClearCart,
  handleAddQuantity,
  handleMinusQuantity,
}: DrawerProps) => {
  const [totalQuantity, setTotalQuantity] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);

  const handleCloseDrawer = () => {
    const drawerOverlay = document.getElementById("my-drawer-4");
    if (drawerOverlay) drawerOverlay.click();
  };

  React.useEffect(() => {
    const [newTotalQuantity, newTotalPrice] = cart.reduce(
      (acc, item) => [
        acc[0] + item.quantity,
        acc[1] +
          (item.cardmarket?.prices?.averageSellPrice || 0) * item.quantity,
      ],
      [0, 0]
    );
    setTotalQuantity(newTotalQuantity);
    setTotalPrice(newTotalPrice);
  }, [cart]);

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* <!-- Page Content --> */}
        {children}
      </div>
      <div className="drawer-side overflow-x-hidden">
        <label htmlFor="my-drawer-4" className="drawer-overlay" />
        <div className="menu p-6 overflow-y-auto bg-steel-gray w-full sm:w-96">
          {/* <!-- Sidebar Content --> */}
          {/* <!-- Header --> */}
          <div className="flex justify-between items-center drawerHeader">
            <div>
              <h2 className="text-2xl font-semibold">Cart</h2>
              <Button variant="link" onClick={handleClearCart}>
                Clear all
              </Button>
            </div>
            <Button
              variant="highlight"
              className="w-12"
              onClick={handleCloseDrawer}
            >
              <IoCloseOutline className="text-3xl" />
            </Button>
          </div>
          {/* <!-- Body --> */}
          <div className="flex mt-5 space-x-2 text-sm">
            <p className="w-14">Item</p>
            <p className="w-full">Qty</p>
            <p className="w-14">Price</p>
          </div>
          <hr className="opacity-10 mt-1" />
          <div className="py-6 space-y-6">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                handleAddQuantity={handleAddQuantity}
                handleMinusQuantity={handleMinusQuantity}
              />
            ))}
          </div>
          {/* <!-- Footer --> */}
          <hr className="opacity-10 mt-auto" />
          <div className="pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-tower-gray text-sm">Total card amount</p>
              <p>{totalQuantity}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-tower-gray text-sm">Total price</p>
              <p>{currencyFormatter(totalPrice)}</p>
            </div>
            <Button variant="highlight" className="w-full">
              Continue to Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
