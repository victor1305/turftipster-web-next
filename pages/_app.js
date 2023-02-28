import React from "react";
import Router from "next/router";
import "@/styles/globals.scss";
import Layout from "@/components/layout";
import DotLoader from "react-spinners/DotLoader";



export default function App({ Component, pageProps }) {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return (
    <Layout {...pageProps}>
      {loading ? (
        <DotLoader color={"#3860fb"} loading={loading} size={150} />
      ) : (
        <Component {...pageProps} />
      )}
    </Layout>
  );
}
