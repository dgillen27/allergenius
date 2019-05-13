import React, { useContext } from "react";
import styled from "styled-components";

const Button = ({ onClickEvent, text }) => {
  const { onClickEvent } = useContext(ButtonContext);
  return (
    <button type="button" onClick={() => `${onClickEvent}()`}>
      {text}
    </button>
  );
};

export default Button;
