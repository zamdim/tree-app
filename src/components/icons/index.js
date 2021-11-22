import React from "react";
import IconsSVG from "./icons.svg";

function Icons({ name }) {
  return (
    <svg className={`icon icon-${name}`}>
      <use href={`${IconsSVG}#icon-${name}`} />
    </svg>
  );
}

export default Icons;
