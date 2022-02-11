import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Layout from "../components/layout";
import PageHeader from "../components/pageheader";
import Panda from "../components/panda";

const IndexPageWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 1em;
`;

const ContentStyled = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-top: 1em;
`;

const IndexPage = () => {
  return (
    <Layout>
      <IndexPageWrapperStyled>
        <PageHeader isFullWidth />

        <ContentStyled>
          <Panda />
        </ContentStyled>
      </IndexPageWrapperStyled>
    </Layout>
  );
};

IndexPage.propTypes = {
  isLoading: PropTypes.bool,
};

export default IndexPage;
