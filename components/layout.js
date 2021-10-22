import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import NavLink from "./navlink";
import styles from "./layout.module.css";

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Windy</title>
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
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
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <meta name="description" content="Windy" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <header>
      <nav>
        <NavLink href={`/`} activeClassName={styles.navItemActive}>
          <a>Home</a>
        </NavLink>

        <NavLink href={`/things`} activeClassName={styles.navItemActive}>
          <a>Things</a>
        </NavLink>
      </nav>
    </header>

    <main>{children}</main>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
