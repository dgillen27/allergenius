import React from "react";
import {GlobalStateConsumer} from '../contexts/GlobalState';
import { Link, withRouter } from "react-router-dom";

const Header = props => {
  const { currentUser, userData } = props;
  return (
    <GlobalStateConsumer>
      {value => (<div className="header">
        <nav className="header-nav">
          <Link to="/">Home</Link>
          <Link to="/places">Places</Link>
          <Link to="/food-allergens">Food Allergies</Link>
          {currentUser && (
            <>
              <Link to={`/user/${userData.id}/username/${userData.username}`}>
                Profile
              </Link>
              <Link to="/logout">Logout</Link>
            </>
          )}
          {!currentUser && (
            <>
              <Link to="translate">Translate</Link>
              <Link to="/login">Login</Link>
              <Link className="sign" to="/register">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>)}
    </GlobalStateConsumer>
  );
};
export default withRouter(Header);
