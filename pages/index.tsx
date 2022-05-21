import type { NextPage } from "next";
import Head from "next/head";
import axios from "axios";

import Card from "../components/Card";
import Drawer from "../components/Drawer";

const Home: NextPage = ({ pokemonCards }: any) => {
  console.log("pokemonCards", pokemonCards);

  return (
    // TODO: Fix syntax (nav, body, footer, etc.)
    // TODO: Button variants
    <div className="min-h-screen bg-ebony-clay font-poppins">
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
          <div className="flex justify-between py-7">
            <h1 className="text-white text-2xl font-semibold">
              Pokemon market
            </h1>
            <div className="flex items-center">
              <p className="text-white">Search by Name</p>
              <label
                htmlFor="my-drawer-4"
                className="drawer-button btn btn-primary"
              >
                Open drawer
              </label>
            </div>
          </div>
          <hr className="opacity-10" />
          <div className="flex">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const pokemonCards = await axios
    .get("https://api.pokemontcg.io/v2/cards?page=1&pageSize=20")
    .then((res) => res.data);

  return {
    props: { pokemonCards },
  };
}
