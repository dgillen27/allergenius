import React, { useState, useEffect } from "react";
import { GlobalStateConsumer } from "../../contexts/GlobalState";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

const DisplayList = props => {
  const { listData } = props;
  console.log("displayList: props.listData", listData);
  const createDate = time => {
    const date = new Date(time);
    return date.toLocaleString("en-US");
  };
  return (
    <GlobalStateConsumer>
      <ListContainer>
        {props.children}
        {/* {value => (
          <div className="stock-list">
            {listData &&
              listData
                .slice(0)
                .reverse()
                .map((post, index) => (
                  <div className="post-container">
                    <div className="post-information">
                      <div className="circle" />
                      <h1>Title: {post.title}</h1>
                      <h2>Date: {createDate(post.created_at)}</h2>
                      <h2>{post.text}</h2>
                    </div>
                  </div>
                ))}
          </div>
        )} */}
      </ListContainer>
    </GlobalStateConsumer>
  );
};
export default withRouter(DisplayList);

const ListContainer = styled.section`
  width: 100%;
  display: flex;
  margin-top: 50px;
  align-items: center;
  font-family: inherit;
  letter-spacing: 0.25px;
  justify-content: center;
`;
