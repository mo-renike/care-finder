import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Head>
        <title>Carefinder | Find Hospitals</title>
        <meta name="description" content="Find hospitals closest to you " />
        <meta
          name="keywords"
          content="hospitals, care, nearby hospitals, best hospital, affordable healthcare"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </main>
  );
}
