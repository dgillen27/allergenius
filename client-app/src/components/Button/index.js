import React, { useContext } from "react";
import styled from "styled-components";

export const Button = styled.button`
  border: 1px solid ${({ primary }) => (primary ? "blue" : "red")}
  padding: 5px;
`;

{
  /* <Button onClick={() => whatever()}>
            left button
          </Button>
          <Button primary onClick={() => whatever()}>
            right button
          </Button> */
}
