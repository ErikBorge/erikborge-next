import Head from "next/head";
import FrontPage from "../public/components/front-page/front-page";
import Solitaire from "../public/components/Solitaire/Solitaire";
import { useEffect, useState } from "react";

export default function Home({ frameSize, isInTransit }) {
  const [solitaire, setSolitaire] = useState(false);
  const [win, setWin] = useState(false);

  useEffect(() => {
    if (!solitaire) {
      setWin(false);
    }
  }, [solitaire]);
  return (
    <div className="index">
      <Head>
        <title>Erik Borge</title>
        <meta name="description" content="Created by Erik Borge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {solitaire && (
        <Solitaire
          frameSize={frameSize}
          setSolitaire={setSolitaire}
          setWin={setWin}
        />
      )}
      {/* <div className={styles.page}> */}
      <FrontPage
        solitaire={solitaire}
        setSolitaire={setSolitaire}
        win={win}
        setWin={setWin}
        isInTransit={isInTransit}
      />
      {/* </div> */}
    </div>
  );
}
