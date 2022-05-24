import Head from "next/head";
import FrontPage from "../public/components/FrontPage/FrontPage";
import Solitaire from "../public/components/Solitaire/Solitaire";
import { useEffect, useState } from "react";

export default function Home({ frameSize, isInTransit }) {
  const [solitaire, setSolitaire] = useState(false);
  const [dropPosition, setDropPosition] = useState({ x: 0, y: 0 });

  return (
    <div className="index">
      <Head>
        <title>Erik Borge</title>
        <meta name="description" content="Created by Erik Borge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Solitaire
        frameSize={frameSize}
        solitaire={solitaire}
        setSolitaire={setSolitaire}
        dropPosition={dropPosition}
        isInTransit={isInTransit}
      />
      {/* <div className={styles.page}> */}
      <FrontPage
        solitaire={solitaire}
        setSolitaire={setSolitaire}
        setDropPosition={setDropPosition}
        isInTransit={isInTransit}
      />
      {/* </div> */}
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      layoutProps: ["noOverflow"],
    },
  };
}
