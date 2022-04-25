import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import styles from "../../styles/tjafs.module.scss";

const Tjafs = () => {
  // const [mish, setMish] = useState(false);
  return (
    <>
      <Head>
        <title>Erik Borge - Tjafs</title>
        <meta name="description" content="Created by Erik Borge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.mishmash}>
        <div className={styles["mishmash__top"]}>
          <h1 className={styles["mishmash__title"]}>Tjafs</h1>
          <div className={styles["mishmash__description"]}>
            En kolleksjon av tang og ting.
          </div>
        </div>
        <div className={styles["mishmash__list"]}>
          <div>
            <Link href={"/tjafs/Branches"}>Greie greiner</Link>
          </div>
          <div>
            <Link href={"/tjafs/ImpossibleButton"}>Faens knapp</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tjafs;
