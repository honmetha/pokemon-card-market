import Image from "next/image";
import { FiShoppingBag } from "react-icons/fi";

import { IPokemon } from "../types/interfaces";
import { currencyFormatter } from "../utils/currencyFormatter";

interface CardProps {
  pokemon: IPokemon;
  handleAddToCart: (pokemon: IPokemon) => void;
}

const Card = ({ pokemon, handleAddToCart }: CardProps) => {
  return (
    <div className="bg-steel-gray rounded-2xl p-4 pt-14 mt-60 w-full">
      <div className="relative flex justify-center">
        <div className="absolute bottom-0">
          <Image
            src={pokemon.images.small}
            alt="Pokemon card"
            width={194}
            height={270}
          />
        </div>
      </div>
      <p className="mt-4 text-center h-12">{pokemon.name}</p>
      <p className="mt-2 text-center text-tower-gray">
        {currencyFormatter(pokemon.cardmarket?.prices?.averageSellPrice || 0)}{" "}
        <span className="text-white opacity-10">•</span> {pokemon.set.total}{" "}
        Cards
      </p>
      <label
        htmlFor="my-drawer-4"
        className="cursor-pointer p-2 rounded-lg flex justify-center items-center w-full bg-white bg-opacity-10 hover:bg-opacity-20 ease-in-out duration-300 mt-2"
        onClick={() => handleAddToCart(pokemon)}
      >
        <FiShoppingBag className="mr-2.5" />
        Add to cart
      </label>
    </div>
  );
};

export default Card;
