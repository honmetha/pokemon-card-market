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

const page: number = 1;
const pageSize: number = 20;

const options = [
  { value: "1", label: "option 1" },
  { value: "2", label: "option 2" },
  { value: "3", label: "option 3" },
  { value: "4", label: "option 4" },
];

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

  console.log("data", data);

  React.useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=${pageSize}`
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
    // ----------------------------------------------
    // TODO: All device test (functionality & design)
    // TODO: Re-read the requirements
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
            <SearchInput SearchInputClassName="mt-6 sm:ml-auto sm:mt-0" />
          </div>
          <hr className="opacity-10" />
          {/* Filters */}
          <div className="py-7 items-center justify-between sm:flex">
            <h2 className="text-lg font-semibold">Choose Card</h2>
            <div className="flex text-black space-x-4 mt-6 sm:mt-0 sm:justify-end">
              <Select placeholder="Set" options={options} />
              <Select placeholder="Rarity" options={options} />
              <Select placeholder="Type" options={options} />
            </div>
          </div>
          {/* Cards */}
          {isLoading ? (
            <div className="w-full mt-40 flex justify-center">
              <Loader />
            </div>
          ) : (
            <div className="grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {data?.data.map((pokemon: IPokemon) => (
                <Card key={pokemon.id} pokemon={pokemon} />
              ))}
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default Home;
