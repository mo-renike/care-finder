
import Head from "next/head";

import Index from "./index/landing-page";

export default function Home() {
  return (
    <main>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Index />
    </main>
  );
}
