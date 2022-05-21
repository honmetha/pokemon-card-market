import Image from "next/image";

import Button from "./Button";

const Card = () => {
  return (
    <div className="bg-steel-gray rounded-2xl p-4 pt-14 mt-32 text-white">
      <div className="relative flex justify-center">
        <div className="absolute bottom-0">
          <Image
            src="https://images.pokemontcg.io/pl3/1.png"
            alt="Pokemon card"
            width={194}
            height={270}
          />
        </div>
      </div>
      <p className="mt-4">Salted Pasta with mushroom sauce</p>
      <p className="mt-2">$ 2.29 20 Cards</p>
      <Button className="mt-2" onChange={() => {}}>
        Add to cart
      </Button>
    </div>
  );
};

export default Card;
