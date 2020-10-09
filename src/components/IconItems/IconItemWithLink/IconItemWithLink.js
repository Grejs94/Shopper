import React from "react";

import { IconItem } from "../index";

import { Link } from "react-router-dom";

const IconItemWithLink = ({ image, text, to }) => {
  return (
    <Link to={to} style={{ textDecoration: "none", color: "white" }}>
      <IconItem image={image} text={text} />
    </Link>
  );
};

export default IconItemWithLink;
