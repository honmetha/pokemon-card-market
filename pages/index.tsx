import type { NextPage } from "next";
import Head from "next/head";
import axios from "axios";
import { FiShoppingBag } from "react-icons/fi";

import Card from "../components/Card";
import Drawer from "../components/Drawer";
import SearchInput from "../components/SearchInput";
import { IPokemonCards, IPokemon } from "../types/interfaces";

const Home: NextPage = ({ pokemonCards }: any) => {
  console.log("pokemonCards", pokemonCards);

  const { data: pokemons } = pokemonCards;

  return (
    // TODO: Fix syntax (nav, body, footer, etc.)
    // TODO: Button variants
    // TODO: getStaticProps context
    // TODO: Fix typescript
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
        <div className="container mx-auto">
          {/* Header, Search and Cart */}
          <div className="flex items-center justify-between py-7">
            <h1 className="text-2xl font-semibold">Pokemon market</h1>
            <div className="flex items-center space-x-4">
              <SearchInput />
              <label
                htmlFor="my-drawer-4"
                className="drawer-button btn text-white shadow-2xl shadow-apricot border-transparent bg-apricot hover:border-transparent hover:bg-apricot "
              >
                <FiShoppingBag className="text-xl" />
              </label>
            </div>
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
