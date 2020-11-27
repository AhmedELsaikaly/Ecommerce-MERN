import React from "react";
import Helmet from "react-helmet";
const Meta = ({ title, keywords, description }) => {
  return (
    <Helmet>
      <title>{title} </title>
      <meta name="description" content={description}></meta>
      <meta name="keyword" content={title}></meta>
    </Helmet>
  );
};
Meta.defaultProps = {
  title: "Welcome to MernShop",
  keywords: "electronics, buy electronics, cheap electronics ",
  description: "We sell best products for cheap",
};

export default Meta;
