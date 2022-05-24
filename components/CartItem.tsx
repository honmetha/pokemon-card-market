import Button from "./Button";

import { IPokemon } from "../types/interfaces";

interface CartItemProps {
  item: IPokemon;
  handleAddQuantity: (targetCard: IPokemon) => void;
  handleMinusQuantity: (targetCard: IPokemon) => void;
}

const CartItem = ({
  item,
  handleAddQuantity,
  handleMinusQuantity,
}: CartItemProps) => {
  return (
    <div className="space-y-2.5">
      <div className="flex space-x-2 text-xs">
        <div className="w-14">
          <img src={item.images.small} alt="" width="100%" />
        </div>
        <div className="w-full space-y-1">
          <p>{item.name}</p>
          <p className="text-tower-gray">
            $ {item.cardmarket?.prices.averageSellPrice}
          </p>
        </div>
        <p className="w-14">
          $ {item.quantity * item.cardmarket?.prices.averageSellPrice}
        </p>
      </div>
      <div className="flex space-x-2 text-lg">
        <Button
          variant="solid"
          className="w-14"
          disabled={item.quantity === 0}
          onClick={() => handleMinusQuantity(item)}
        >
          -
        </Button>
        <p className="ease-in-out duration-300 p-2 rounded-lg flex justify-center items-center w-full bg-white bg-opacity-10 border border-transparent hover:bg-transparent hover:border-white">
          {item.quantity}
        </p>
        <Button
          variant="solid"
          className="w-14"
          disabled={item.quantity === item.set.total}
          onClick={() => handleAddQuantity(item)}
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
