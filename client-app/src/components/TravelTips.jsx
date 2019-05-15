import React from "react";
import {GlobalStateConsumer} from '../contexts/GlobalState';
import DisplayList from "./DisplayList";

export default props => (
  <GlobalStateConsumer>
    {value => (<div className="contact-container">
      <h1>TravelTips</h1>
      <DisplayList listData={props.postList} />
    </div>)}
  </GlobalStateConsumer>
);
