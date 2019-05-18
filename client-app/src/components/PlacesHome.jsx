import React, { useState, useEffect } from "react";
import { GlobalStateConsumer } from "../contexts/GlobalState";
import QueryBar from "./QueryBar";
import { Link, Route, withRouter } from "react-router-dom";
import Icon from "./Icon";
import mediaData from "../data/mediaData";

const PlacesHome = props => {
  const [state, setState] = useState({
    fetchingMedia: true,
    mediaArray: mediaData
  });

  const mediaFetch = async () => {
    const mediaArray = Promise.all(
      mediaArray.map(place => props.getMedia(place))
    );
    setState({
      fetchingMedia: false,
      mediaArray: mediaArray
    });
  };

  useEffect(() => mediaFetch(), []);
  const {
    onFormChange,
    onClick,
    onKeyDown,
    activeOption,
    filteredOptions,
    showOptions,
    userInput,
    onSubmit
  } = props;
  return (
    <GlobalStateConsumer>
      {value => (
        <>
          <div className="contact-container">
            <h1>Places Home</h1>
            <QueryBar
              {...props}
              placeHolder="Search Cities and Countries"
              onKeyDown={onKeyDown}
              onFormChange={onFormChange}
              onClick={onClick}
              onSubmit={onSubmit}
              showOptions={showOptions}
              userInput={userInput}
              filteredOptions={filteredOptions}
              activeOptions={activeOption}
            />
          </div>
          {!state.fetchingMedia && (
            <div className="explore-home-container">
              <h1>Explore Allergenius</h1>
              <div className="preset-container-list">
                <div className="circle" />
                <h2>Places</h2>
                <div className="preset-container">
                  <Icon url={state.mediaArray[0]} id="places-icon" />
                  <Link to={"/places-city/London/456"}>London, England</Link>
                </div>
                <div className="preset-container">
                  <Icon url={state.mediaArray[1]} id="places-icon" />
                  <Link to={"/places-city/Paris/2974"}>Paris, France</Link>
                </div>
                <div className="preset-container">
                  <Icon url={state.mediaArray[2]} id="places-icon" />
                  <Link to={"/places-city/Tokyo/1532"}>Tokyo, Japan</Link>
                </div>
                <div className="preset-container">
                  <Icon url={state.mediaArray[3]} id="places-icon" />
                  <Link to={"/places-city/RioDeJaniero/207"}>
                    Rio De Janiero, Brazil
                  </Link>
                </div>
                <div className="preset-container">
                  <Icon url={state.mediaArray[4]} id="places-icon" />
                  <Link to={"/places-city/Berlin/"}>Berlin, Germany</Link>
                </div>
                <div className="preset-container">
                  <Icon url={state.mediaArray[5]} id="places-icon" />
                  <Link to={"/places-country/Mexico/"}>Mexico</Link>
                </div>
                <div className="preset-container">
                  <Icon url={state.mediaArray[6]} id="places-icon" />
                  <Link to={"/places-city/Montreal/"}>Montreal, Canada</Link>
                </div>
                <div className="preset-container">
                  <Icon url={state.mediaArray[7]} id="places-icon" />
                  <Link to={"/places-country/China/"}>China</Link>
                </div>
                <div className="preset-container">
                  <Icon url={state.mediaArray[8]} id="places-icon" />
                  <Link to={"/places-country/India/"}>India</Link>
                </div>
                <div className="preset-container">
                  <Icon url={state.mediaArray[9]} id="places-icon" />
                  <Link to={"/places-country/Egypt/"}>Egypt</Link>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </GlobalStateConsumer>
  );
};

export default PlacesHome;
