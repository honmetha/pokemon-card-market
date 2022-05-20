import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Pokemon Card Market</title>
        <meta
          name="description"
          content="The best Pokemon card selling platform."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Pokemon Card Market</h1>
    </div>
  );
};

export default Home;
