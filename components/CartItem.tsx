import Button from "./Button";
import Image from "next/image";

import { IPokemon } from "../types/interfaces";
import { currencyFormatter } from "../utils/currencyFormatter";

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
        <div className="relative w-14 h-14">
          <Image
            alt={item.name}
            src={item.images.small}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="w-full space-y-1">
          <p>{item.name}</p>
          <p className="text-tower-gray">
            {currencyFormatter(item.cardmarket?.prices?.averageSellPrice || 0)}
          </p>
        </div>
        <p className="w-14 whitespace-nowrap">
          {currencyFormatter(
            item.quantity * (item.cardmarket?.prices?.averageSellPrice || 0)
          )}
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
