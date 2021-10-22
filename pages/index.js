import React from "react";
import PropTypes from "prop-types";
import Layout from "../components/layout";

const IndexPage = () => {
  return (
    <Layout>
      <p>Hi there 👋</p>
    </Layout>
  );
};

IndexPage.propTypes = {
  isLoading: PropTypes.bool,
};

export default IndexPage;
