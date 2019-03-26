import React from "react";
import { withRouter } from "react-router-dom";

const QueryBar = props => {
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
  let optionList;
  if (showOptions && userInput) {
    if (filteredOptions.length) {
      optionList = (
        <ul className="options">
          {filteredOptions.map((optionName, index) => {
            let className;
            if (index === activeOption) {
              className = "option-active";
            }
            return (
              <li
                id="list-els"
                className={className}
                key={`${optionName}-${index}`}
                onClick={onClick}
              >
                {optionName}
              </li>
            );
          })}
        </ul>
      );
    } else {
      optionList = (
        <div className="no-options">
          <em>No Option!</em>
        </div>
      );
    }
  }

  return (
    <div className="form-query">
      <div className="form-container">
        <form id="query-search-form">
          <input
            type="text"
            className="search-box"
            onChange={onFormChange}
            onKeyDown={onKeyDown}
            value={userInput}
            onSubmit={onSubmit && onClick}
            name="userInput"
            autoComplete="off"
            placeholder="search stations"
          />
        </form>
      </div>
      <div className="options-container">{optionList}</div>
    </div>
  );
};
export default withRouter(QueryBar);
