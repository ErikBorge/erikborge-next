import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import FrontPage from "../public/components/front-page/front-page";
import Solitaire from "../public/components/Solitaire/Solitaire";
import { useState } from "react";

export default function Home({ frameSize }) {
  const [solitaire, setSolitaire] = useState(false);
  return (
    <div className="index">
      <Head>
        <title>Erik Borge</title>
        <meta name="description" content="Created by Erik Borge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button onClick={() => setSolitaire(true)}>Solitaire</button>
      {solitaire && (
        <Solitaire frameSize={frameSize} setSolitaire={setSolitaire} />
      )}
      {/* <div className={styles.page}> */}
      <FrontPage />
      {/* </div> */}
    </div>
  );
}
