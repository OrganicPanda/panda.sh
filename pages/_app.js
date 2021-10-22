import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = (url, { shallow }) => {
      if (!shallow) {
        setIsLoading(true);
      }
    };

    const handleRouteChangeEnd = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeEnd);
    router.events.on("routeChangeError", handleRouteChangeEnd);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeEnd);
      router.events.off("routeChangeError", handleRouteChangeEnd);
    };
  }, []);

  return <Component {...pageProps} isLoading={isLoading} />;
}

MyApp.propTypes = {
  Component: PropTypes.node.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
