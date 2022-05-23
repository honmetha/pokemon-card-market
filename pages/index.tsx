import type { NextPage } from "next";
import Head from "next/head";
import axios from "axios";

import Card from "../components/Card";
import Drawer from "../components/Drawer";
import SearchInput from "../components/SearchInput";
import { IPokemonCards, IPokemon } from "../types/interfaces";
import DrawerTrigger from "../components/DrawerTrigger";

const Home: NextPage = ({ pokemonCards }: any) => {
  console.log("pokemonCards", pokemonCards);

  const { data: pokemons } = pokemonCards;

  return (
    // TODO: Fix syntax (nav, body, footer, etc.)
    // TODO: getStaticProps context
    // TODO: Fix typescript
    // TODO: Next image
    // TODO: Outline button -> input
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
          <div className="flex items-center justify-between py-7">
            <h2 className="text-lg font-semibold">Choose Card</h2>
            <div>Filters</div>
          </div>
          {/* Cards */}
          <div className="grid sm:gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            {pokemons.map((pokemon: IPokemon) => (
              <Card key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const pokemonCards: IPokemonCards = await axios
    .get("https://api.pokemontcg.io/v2/cards?page=1&pageSize=20")
    .then((res) => res.data);

  return {
    props: { pokemonCards },
  };
}
