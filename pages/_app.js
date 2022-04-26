import Head from "next/head";
import "../styles/globals.scss";
import Layout from "../public/components/Layout/Layout";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [isInTransit, setIsInTransit] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [frameSize, setFrameSize] = useState(false);

  useEffect(() => {
    if (isInTransit && isMounted) {
      setTimeout(() => {
        setIsInTransit(false);
      }, 500);
    }
  }, [isInTransit]);

  useEffect(() => {
    const el = document.getElementById("Frame");
    if (el) setFrameSize({ width: el.offsetWidth, height: el.offsetHeight });
  }, [isInTransit]);
  return (
    <>
      <Head>
        <title>{pageProps?.page?.title}</title>
        <meta name="description" content={pageProps?.page?.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout
        isInTransit={isInTransit}
        setIsInTransit={setIsInTransit}
        setIsMounted={setIsMounted}
        layoutProps={pageProps.layoutProps}
      >
        <Component
          {...pageProps?.page}
          isInTransit={isInTransit}
          setIsInTransit={setIsInTransit}
          frameSize={frameSize}
        />
      </Layout>
    </>
  );
}

export default MyApp;
