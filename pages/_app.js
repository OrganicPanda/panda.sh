import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Head from "next/head";
import { Normalize } from "styled-normalize";
import "../public/pandastyle.css";

const colors = {
  // https://www.happyhues.co/palettes/14
  standard: {
    background: "#fffffe",
    headline: "#272343",
    paragraph: "#2d334a",
    link: "#272343",
    button: {
      background: "#ffd803",
      text: "#272343",
    },
    illustration: {
      stroke: "#272343",
      main: "#fffffe",
      highlight: "#ffd803",
      secondary: "#e3f6f5",
      tertiary: "#bae8e8",
    },
    card: {
      background: "#fffffe",
      headline: "#272343",
      paragraph: "#2d334a",
    },
    section1: {
      background: "#e3f6f5",
      headline: "#272343",
      subHeadline: "#2d334a",
    },
  },
};

const defaultTheme = {
  palette: colors.standard,
  screens: {
    large: 768,
  },
};

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  }

  body {
    background: ${({ theme }) => theme.palette.background};
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>panda.sh</title>
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content={process.env.THEME_BACKGROUND} key="msapplication-TileColor" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content={process.env.THEME_BACKGROUND} key="theme-color"/>
        <meta name="theme-color" content={process.env.THEME_BACKGROUND_DARK} key="theme-color-dark" media="(prefers-color-scheme: dark)"/>
        <meta name="description" content="an unloved website" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <Normalize />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
