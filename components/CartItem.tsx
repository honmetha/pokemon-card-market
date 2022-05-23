import Button from "./Button";

const CartItem = () => {
  return (
    <div className="space-y-2.5">
      <div className="flex space-x-2 text-xs">
        <div className="w-14">
          <img
            src="https://images.pokemontcg.io/xy5/1.png"
            alt=""
            width="100%"
          />
        </div>
        <div className="w-full space-y-1">
          <p>Celebi & Venusaur-GX</p>
          <p className="text-tower-gray">$ 2.29</p>
        </div>
        <p className="w-14">$ 4.58</p>
      </div>
      <div className="flex space-x-2 text-lg">
        <Button variant="solid" className="w-14">
          -
        </Button>
        <Button variant="outline" className="w-full">
          2
        </Button>
        <Button variant="solid" className="w-14">
          +
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
