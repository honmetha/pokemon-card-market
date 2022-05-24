import type { NextPage } from "next";
import Head from "next/head";
import * as React from "react";

import Card from "../components/Card";
import Loader from "../components/Loader";
import Select from "../components/Select";
import Drawer from "../components/Drawer";
import SearchInput from "../components/SearchInput";
import DrawerTrigger from "../components/DrawerTrigger";
import { IPokemonCards, IPokemon, IOptions } from "../types/interfaces";
import useFetchSelects from "../hooks/useFetchSelects";
import useFetchSets from "../hooks/useFetchSets";

const page: number = 1;
const pageSize: number = 20;

const Home: NextPage = () => {
  const [data, setData] = React.useState<IPokemonCards | null>(null);
  const [isLoading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [set, setSet] = React.useState("");
  const [rarity, setRarity] = React.useState("");
  const [type, setType] = React.useState("");

  const [cart, setCart] = React.useState([]);
  const [totalCardAmount, setTotalCardAmount] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);

  const { isLoading: isLoadingTypes, data: types } = useFetchSelects(
    `https://api.pokemontcg.io/v2/types`
  );
  const { isLoading: isLoadingRarities, data: rarities } = useFetchSelects(
    `https://api.pokemontcg.io/v2/rarities`
  );
  const { isLoading: isLoadingSets, data: sets } = useFetchSets(
    `https://api.pokemontcg.io/v2/sets?page=${page}&pageSize=${pageSize}`
  );

  console.log("data", data);

  React.useEffect(() => {
    setLoading(true);

    let queryParams: string = "";
    if (search) queryParams += `&q=name:${search}`;
    if (set) queryParams += `&q=set.id:${set}`;
    if (rarity) queryParams += `&q=name:${search}`;
    if (type) queryParams += `&q=name:${search}`;

    fetch(
      `https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=${pageSize}${queryParams}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [search, set, rarity, type]);

  React.useEffect(() => {
    // Set total amount and price
  }, [cart]);

  return (
    // TODO: Fix card and sidebar payment styles
    // TODO: Fix syntax (nav, body, footer, etc.)
    // TODO: Fix typescript
    // TODO: Next image
    // TODO: Cart outline input
    // TODO: Do filters need to fetch?
    // TODO: clear filter button?
    // TODO: Select bug - can't expand after select
    // TODO: Responsiveness of select
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

      <Drawer>
        <div className="container mx-auto px-5">
          {/* Header, Search and Cart */}
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
          {/* Filters */}
          <div className="py-7 items-center justify-between sm:flex">
            <h2 className="text-lg font-semibold">Choose Card</h2>
            <div className="flex text-black space-x-4 mt-6 sm:mt-0 sm:justify-end">
              <Select
                placeholder={isLoadingSets ? "Loading..." : "Set"}
                options={sets}
                setState={setSet}
              />
              <Select
                placeholder={isLoadingRarities ? "Loading..." : "Rarity"}
                options={rarities}
                setState={setRarity}
              />
              <Select
                placeholder={isLoadingTypes ? "Loading..." : "Type"}
                options={types}
                setState={setType}
              />
            </div>
          </div>
          {/* Cards */}
          {isLoading ? (
            <div className="w-full mt-40 flex justify-center">
              <Loader />
            </div>
          ) : (
            <div className="grid pb-8 sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {data?.data.map((pokemon: IPokemon) => (
                <Card key={pokemon.id} pokemon={pokemon} />
              ))}
            </div>
          )}
          {!isLoading && !data?.data.length && (
            <p className="text-center mt-40 text-3xl">No data</p>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default Home;
