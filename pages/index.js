import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import FrontPage from "../public/components/front-page/front-page";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Erik Borge</title>
        <meta name="description" content="Created by Erik Borge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <div className={styles.page}> */}
      <FrontPage />
      {/* </div> */}
    </div>
  );
}
