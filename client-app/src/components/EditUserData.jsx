import React from "react";
import {GlobalStateConsumer} from '../contexts/GlobalState';

export default props => {
  const {
    show,
    toggle,
    username,
    email,
    password,
    onChange,
    onSubmit,
    onClick,
    submitButtonText,
    backButtonText,
    passwordAsk,
    title,
    userData,
    allergens
  } = props;

  console.log("edit user form props", userData, allergens);
  return (
    <GlobalStateConsumer>
      {value => (<div className="user-form-container" id="register-container">
        <div className="inner-form-container">
          <form id="register-form">
            <div id="x" onClick={() => props.history.push(`/`)}>
              X
            </div>
            <img src="https://i.imgur.com/ypBE1hi.png" alt="" />
            <h2>{title}</h2>
            <div className="text-input-container">
              <div className="text-input">
                <input
                  type="text"
                  onChange={onChange}
                  name="email"
                  id="email"
                  value={email}
                  placeholder="Email"
                />
              </div>
              <div className="text-input">
                <input
                  type="text"
                  onChange={onChange}
                  name="username"
                  id="username"
                  value={userData ? userData.username : username}
                  placeholder="Username"
                />
              </div>
            </div>
            <label htmlFor="allergens">
              Select your allergies:
              <select name="Allergens" multiple size="2">
                {allergens &&
                  allergens.map((el, i) => (
                    <option
                      className={el}
                      name="allergy"
                      key={el.id}
                      value={el.id}
                      onClick={onChange}
                    >
                      {el}
                    </option>
                  ))}
              </select>
            </label>
            <button type="submit" onClick={onSubmit}>
              Submit Edit
            </button>
          </form>
          <div className="login-bottom">
            <div id="hover" onClick={onClick} />
          </div>
        </div>
      </div>)}
    </GlobalStateConsumer>
  );
};
