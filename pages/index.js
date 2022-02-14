import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Main from "../public/components/main/main";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Erik Borge</title>
        <meta name="description" content="Created by Erik Borge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <Main />
      </div>
    </div>
  );
}
