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
import usePrevious from "../hooks/usePrevious";
import Pagination from "../components/Pagination";

const pageSize: number = 20;

const Home: NextPage = () => {
  const [data, setData] = React.useState<IPokemonCards | null>(null);
  const [isLoading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [set, setSet] = React.useState("");
  const [rarity, setRarity] = React.useState("");
  const [type, setType] = React.useState("");
  const [cart, setCart] = React.useState<IPokemon[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const debouncedSearchTerm = useDebounce(search, 500);
  const prevAmount = usePrevious({ currentPage });

  const { isLoading: isLoadingTypes, data: types } = useFetchSelects(
    `https://api.pokemontcg.io/v2/types`
  );
  const { isLoading: isLoadingRarities, data: rarities } = useFetchSelects(
    `https://api.pokemontcg.io/v2/rarities`
  );
  const { isLoading: isLoadingSets, data: sets } = useFetchSets(
    `https://api.pokemontcg.io/v2/sets?page=1&pageSize=20`
  );

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
    const fetchPokemons = () => {
      setLoading(true);

      let queryParams: string = "&q=";
      if (debouncedSearchTerm) queryParams += ` name:"${debouncedSearchTerm}*"`;
      if (set) queryParams += ` set.id:"${set}"`;
      if (rarity) queryParams += ` rarity:"${rarity}"`;
      if (type) queryParams += ` types:"${type}"`;

      const isSearchFiltersChanged: boolean =
        prevAmount?.currentPage === currentPage && currentPage !== 1;
      if (isSearchFiltersChanged) setCurrentPage(1);
      const newCurrentPage: number = isSearchFiltersChanged ? 1 : currentPage;

      fetch(
        `https://api.pokemontcg.io/v2/cards?page=${newCurrentPage}&pageSize=${pageSize}${queryParams}`
      )
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setTotalPages(Math.ceil(data.totalCount / pageSize));
          setLoading(false);
        });
    };

    fetchPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, set, rarity, type, currentPage]);

  return (
    <div className="min-h-screen bg-ebony-clay font-poppins text-white">
      <Head>
        <title>Pokemon Card Market</title>
        <meta
          name="description"
          content="The best Pokemon card selling platform."
        />
        <link rel="icon" type="image/png" href="/pokeball.png" />
      </Head>

      <Drawer
        cart={cart}
        handleClearCart={handleClearCart}
        handleAddQuantity={handleAddQuantity}
        handleMinusQuantity={handleMinusQuantity}
      >
        <div className="container mx-auto px-5">
          {/* <!-- Header --> */}
          <header className="flex items-center flex-wrap py-7 sm:flex-row-reverse">
            <h1 className="text-2xl font-semibold sm:order-1">
              Pokemon market
            </h1>
            <DrawerTrigger className="ml-auto sm:ml-4" />
            <SearchInput
              SearchInputClassName="mt-6 sm:ml-auto sm:mt-0"
              onChange={(e) => setSearch(e.target.value)}
            />
          </header>
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
          {/* <!-- Search Results --> */}
          {isLoading ? (
            <div className="w-full my-40 flex justify-center">
              <Loader />
            </div>
          ) : (
            <div className="grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
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
          {data && data.data?.length > 0 && (
            <Pagination
              className="my-6 flex items-center justify-end space-x-2"
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default Home;
