import type { NextPage } from "next";
import Head from "next/head";
import * as React from "react";

import Card from "../components/Card";
import Loader from "../components/Loader";
import Select from "../components/Select";
import Drawer from "../components/Drawer";
import SearchInput from "../components/SearchInput";
import DrawerTrigger from "../components/DrawerTrigger";
import { IPokemonCards, IPokemon } from "../types/interfaces";
import useFetchSelects from "../hooks/useFetchSelects";
import useFetchSets from "../hooks/useFetchSets";
import useDebounce from "../hooks/useDebounce";

const page: number = 1;
const pageSize: number = 20;

const Home: NextPage = () => {
  const [data, setData] = React.useState<IPokemonCards | null>(null);
  const [isLoading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [set, setSet] = React.useState("");
  const [rarity, setRarity] = React.useState("");
  const [type, setType] = React.useState("");
  const [cart, setCart] = React.useState<IPokemon[]>([]);
  const debouncedSearchTerm = useDebounce(search, 500);

  const { isLoading: isLoadingTypes, data: types } = useFetchSelects(
    `https://api.pokemontcg.io/v2/types`
  );
  const { isLoading: isLoadingRarities, data: rarities } = useFetchSelects(
    `https://api.pokemontcg.io/v2/rarities`
  );
  const { isLoading: isLoadingSets, data: sets } = useFetchSets(
    `https://api.pokemontcg.io/v2/sets?page=${page}&pageSize=${pageSize}`
  );

  // console.log("data", data);
  console.log("cart", cart);

  const handleClearCart = () => setCart([]);
  const handleAddToCart = (selectedCard: IPokemon) => {
    const existedItemInCart: IPokemon | undefined = cart.find(
      (item) => item.id === selectedCard.id
    );
    if (!existedItemInCart)
      return setCart([...cart, { ...selectedCard, quantity: 1 }]);

    handleAddQuantity(existedItemInCart);
  };

  const handleAddQuantity = (targetCard: IPokemon) => {
    const newQuantity: number = targetCard.quantity + 1;
    if (newQuantity > targetCard.set.total) return;

    const newCart: IPokemon[] = cart.map((item) => {
      if (item.id !== targetCard.id) return item;
      return { ...item, quantity: newQuantity };
    });
    setCart(newCart);
  };

  const handleMinusQuantity = (targetCard: IPokemon) => {
    const newQuantity: number = targetCard.quantity - 1;

    if (newQuantity === 0) {
      const newCart: IPokemon[] = cart.filter(
        (item) => item.id !== targetCard.id
      );
      return setCart(newCart);
    }

    const newCart: IPokemon[] = cart.map((item) => {
      if (item.id !== targetCard.id) return item;
      return { ...item, quantity: newQuantity };
    });
    setCart(newCart);
  };

  React.useEffect(() => {
    setLoading(true);
    let queryParams: string = "&q=";
    if (debouncedSearchTerm) queryParams += ` name:"${debouncedSearchTerm}"`;
    if (set) queryParams += ` set.id:"${set}"`;
    if (rarity) queryParams += ` rarity:"${rarity}"`;
    if (type) queryParams += ` types:"${type}"`;

    fetch(
      `https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=${pageSize}${queryParams}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [debouncedSearchTerm, set, rarity, type]);

  return (
    // TODO: Fix styles on card and sidebar payment
    // TODO: Fix syntax (nav, body, footer, etc.)
    // TODO: Fix typescript
    // TODO: Next image
    // TODO: Cart outline input
    // TODO: Responsiveness of select
    // TODO: Warnings in console
    // TODO: Shared currency formatter
    // ----------------------------------------------
    // TODO: All device test (functionality & design)
    // TODO: Re-read the requirements
    // TODO: Deployment
    // TODO: Write README.md
    <div className="min-h-screen bg-ebony-clay font-poppins text-white">
      <Head>
        <title>Pokemon Card Market</title>
        <meta
          name="description"
          content="The best Pokemon card selling platform."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Drawer
        cart={cart}
        handleClearCart={handleClearCart}
        handleAddQuantity={handleAddQuantity}
        handleMinusQuantity={handleMinusQuantity}
      >
        <div className="container mx-auto px-5">
          {/* <!-- Navigation --> */}
          <div className="flex items-center flex-wrap py-7 sm:flex-row-reverse">
            <h1 className="text-2xl font-semibold sm:order-1">
              Pokemon market
            </h1>
            <DrawerTrigger className="ml-auto sm:ml-4" />
            <SearchInput
              SearchInputClassName="mt-6 sm:ml-auto sm:mt-0"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <hr className="opacity-10" />
          {/* <!-- Filters --> */}
          <div className="py-7 items-center justify-between sm:flex">
            <h2 className="text-lg font-semibold">Choose Card</h2>
            <div className="flex text-black space-x-2 mt-6 sm:space-x-4 sm:mt-0 sm:justify-end">
              <Select
                placeholder={isLoadingSets ? "Loading..." : "Set"}
                options={sets}
                setParentState={setSet}
              />
              <Select
                placeholder={isLoadingRarities ? "Loading..." : "Rarity"}
                options={rarities}
                setParentState={setRarity}
              />
              <Select
                placeholder={isLoadingTypes ? "Loading..." : "Type"}
                options={types}
                setParentState={setType}
              />
            </div>
          </div>
          {/* <!-- Cards --> */}
          {isLoading ? (
            <div className="w-full mt-40 flex justify-center">
              <Loader />
            </div>
          ) : (
            <div className="grid pb-8 sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {data?.data?.map((pokemon: IPokemon) => (
                <Card
                  key={pokemon.id}
                  pokemon={pokemon}
                  handleAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
          {!isLoading && !data?.data?.length && (
            <p className="text-center mt-40 text-3xl">No data</p>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default Home;
