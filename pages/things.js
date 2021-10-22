import React from "react";
import PropTypes from "prop-types";
import Layout from "../components/layout";

const ThingsPage = () => {
  return (
    <Layout>
      <p>Things are here</p>
    </Layout>
  );
};

ThingsPage.propTypes = {
  isLoading: PropTypes.bool,
};

export default ThingsPage;
