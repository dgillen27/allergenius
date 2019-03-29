import React, { Component } from "react";
import { Link, Route, withRouter } from "react-router-dom";
import Footer from "./components/Footer";
import QueryBar from "./components/QueryBar";
import Header from "./components/Header";
import ExploreHome from "./components/ExploreHome";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import PlacesHome from "./components/PlacesHome";
import DisplayPlace from "./components/DisplayPlace";
import About from "./components/About";
import Privacy from "./components/Privacy";
import Faq from "./components/FAQ";
import Contact from "./components/ContactForm";
import FoodAllergenHome from "./components/FoodAllergenHome";
import DisplayFoodAllergen from "./components/DisplayFoodAllergen";
import LogoutForm from "./components/LogoutForm";
import TravelTips from "./components/TravelTips";
import UserProfile from "./components/UserProfile";
import decode from "jwt-decode";
import { registerUser, verifyToken, loginUser } from './services/usersApi'
import { getTranslation, speak} from './services/googleApiHelper';

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: "",
      registerFormData: {
        username: "",
        email: "",
        password: ""
      },
      currentUser: null,
      toggleLogin: true,
      loginFormData: {
        email: "",
        password: ""
      },
      token: "",
      userData: {},

      //below is used for the query bar input
      userInput: "",
      autocompleteOptions: [],
      activeOption: 0,
      filteredOptions: [],
      showOptions: false
    };
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleQueryClick = this.handleQueryClick.bind(this);
    this.handleQueryKeyDown = this.handleQueryKeyDown.bind(this);
    this.handleQuerySubmit = this.handleQuerySubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLoginFormChange = this.handleLoginFormChange.bind(this);
    this.handleEditFormChange = this.handleEditFormChange.bind(this);
    this.handleRegisterFormChange = this.handleRegisterFormChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleQueryChange = e => {
    const { autocompleteOptions } = this.state;
    const userInput = e.currentTarget.value;
    console.log("this is userInput", userInput);
    const filteredOptions = autocompleteOptions.filter(
      option => option.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    console.log("this is handleQueryChange: filteredOptions", filteredOptions);
    this.setState({
      activeOption: 0,
      filteredOptions: filteredOptions,
      showOptions: true,
      userInput: userInput
    });
  };

  async handleQueryClick(e) {
    //e.preventDefault();
    console.log(
      "this is handlequeryclick: e.currentTarget.innerText",
      e.currentTarget.innerText
    );
    const userInput = e.currentTarget.innerText;
    const currentStation = this.state.stationData.filter(
      station => station.name + " " + station.lines === userInput
    );

    await this.setState((prevState, newState) => ({
      currentStation: currentStation,
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: userInput
    }));
    console.log(
      "this is handlequeryclick: this.state.userInput",
      this.state.userInput
    );
    console.log(
      "this is handlequeryclick: this.state.currentStation",
      this.state.currentStation
    );
    this.props.history.push(`/stations/${this.state.currentStation[0].id}`);
  }

  handleQueryKeyDown = e => {
    const { activeOption, filteredOptions } = this.state;
    if (e.keyCode === 13) {
      this.setState((prevState, newState) => ({
        activeOption: 0,
        showOptions: false,
        userInput: filteredOptions[activeOption]
      }));
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      this.setState({ activeOption: activeOption - 1 });
    } else if (e.keyCode === 40) {
      if (activeOption - 1 === filteredOptions.length) {
        return;
      }
      this.setState({ activeOption: activeOption + 1 });
    }
  };

  handleQuerySubmit(e) {
    const { name, value } = e.target;
    console.log("querySubmit", this.state.userInput);
    this.setState((prevState, newState) => ({
      [name]: value
    }));
  }

  async handleLogin(e) {
    e.preventDefault();
    const { userData }= await loginUser(this.state.loginFormData);
    console.log(userData);
    this.setState({
      currentUser: userData,
      token: localStorage.getItem('authToken')
    });

    this.props.history.push('/users');
    // e.preventDefault();
    //const userData = await loginUser(this.state.loginFormData);
    //console.log("userdata from handleLogin", userData);
    // this.setState({
    //   currentUser: userData.data.user.username,
    //   token: userData.data.token,
    //   userData: userData.data.user,
    //   loginFormData: {
    //     email: "",
    //     password: ""
    //   }
    // });
    //localStorage.setItem("jwt", userData.data.token);
  }

  handleLoginClick(e) {
    e.preventDefault();
    this.setState((prevState, newState) => ({
      toggleLogin: !prevState.toggleLogin
    }));
  }

  async handleRegister(e) {
    e.preventDefault();
    const { registerFormData } = this.state;
    const userData = await registerUser(registerFormData);
    this.setState({
      currentUser: userData
    });
    this.props.history.push(`/users`);
  }

  async handleEdit(e) {
    e.preventDefault();
    // const userData = await editUser(
    //   this.state.userData.id,
    //   this.state.userData
    // );
    //console.log("resp userData from handleEdit", userData);
    // this.setState((prevState, newState) => ({
    //   currentUser: userData.data.user.username,
    //   userData: userData.data.user
    // }));
    // this.props.history.push(
    //   `/user/${this.state.userData.id}/username/${this.state.userData.username}`
    // );
  }

  handleLogout() {
    localStorage.removeItem("jwt");
    this.setState({
      currentUser: null,
      toggleLogin: true
    });
    this.props.history.push(`/`);
  }

  handleLoginFormChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      loginFormData: {
        ...prevState.loginFormData,
        [name]: value
      }
    }));
  }

  handleRegisterFormChange(e) {
    const { name, value } = e.target;
    console.log("handleRegisterChange name, val", name, value);
    this.setState(prevState => ({
      registerFormData: {
        ...prevState.registerFormData,
        [name]: value
      }
    }));
  }

  handleEditFormChange(e) {
    const { name, value } = e.target;
    console.log("handleEditChange name, val", name, value);
    this.setState(prevState => ({
      userData: {
        ...prevState.userData,
        [name]: value
      }
    }));
  }

  async componentDidMount() {
    //await this.getQueryBarData();
    try {
      const { user } = await verifyToken();
      if (user !== undefined) {
        this.setState({
          currentUser: user
        })
      } else {
        this.props.history.push('/');
      }
    } catch (e) {
      this.props.history.push('/');
    }
    // const checkUser = localStorage.getItem("jwt");
    // if (checkUser) {
    //   const user = decode(checkUser);
    //   this.setState((prevState, newState) => ({
    //     currentUser: user,
    //     token: checkUser,
    //     userData: {
    //       id: user.id,
    //       username: user.username,
    //       email: user.email
    //     }
    //   }));
    // }
  }
  render() {
    return (
      <div className="Main-app-body">
        <Header />
        <Route
          exact
          path="/"
          render={props => (
            <>
              <div className="header-container">
                <h1 className="main-title">Hey traveler</h1>
                <QueryBar
                  onKeyDown={this.handleQueryKeyDown}
                  onFormChange={this.handleQueryChange}
                  onClick={this.handleQueryClick}
                  onSubmit={this.state.handleQuerySubmit}
                  showOptions={this.state.showOptions}
                  userInput={this.state.userInput}
                  filteredOptions={this.state.filteredOptions}
                  activeOptions={this.state.activeOption}
                />
              </div>
              <ExploreHome />
            </>
          )}
        />
        <Route
          exact
          path="/login"
          render={props => (
            <>
              <LoginForm
                {...props}
                show={this.state.currentUser}
                toggle={this.state.toggleLogin}
                onChange={this.handleLoginFormChange}
                onSubmit={this.handleLogin}
                email={this.state.loginFormData.email}
                password={this.state.loginFormData.password}
                onClick={this.handleLoginClick}
              />
              <RegisterForm
                {...props}
                userData={""}
                title={"Register User"}
                onClick={this.handleLoginClick}
                show={this.state.currentUser}
                toggle={this.state.toggleLogin}
                onChange={this.handleRegisterFormChange}
                onSubmit={this.handleRegister}
                username={this.state.registerFormData.username}
                email={this.state.registerFormData.email}
                avatar={this.state.registerFormData.avatar}
                isLocal={this.state.registerFormData.isLocal}
                password={this.state.registerFormData.password}
                submitButtonText="Submit"
                backButtonText="Back to Login"
                passwordAsk={"y"}
                toggleLocal={this.state.handleToggleLocalRegister}
              />
            </>
          )}
        />
        <Route
          exact
          path="/register"
          render={props => (
            <>
              <RegisterForm
                {...props}
                userData={""}
                title={"Register User"}
                onClick={this.handleLoginClick}
                show={this.state.currentUser}
                toggle={this.state.toggleLogin}
                onChange={this.handleRegisterFormChange}
                onSubmit={this.handleRegister}
                username={this.state.registerFormData.username}
                email={this.state.registerFormData.email}
                password={this.state.registerFormData.password}
                submitButtonText="Submit"
                backButtonText="Back to Login"
              />
            </>
          )}
        />
        <Route exact path="/about" render={() => <About />} />
        <Route exact path="/privacy" render={() => <Privacy />} />
        <Route exact path="/travel-tips" render={() => <TravelTips />} />
        <Route exact path="/FAQ" render={() => <Faq />} />
        <Route
          exact
          path="/food-allergens"
          render={() => <FoodAllergenHome />}
        />
        <Route
          exact
          path="/food-allergens/:allergen_id"
          render={() => <DisplayFoodAllergen />}
        />
        <Route
          exact
          path="/user/:id/username/:username"
          render={props => (
            <UserProfile
              {...props}
              userData={this.state.userData}
              stationData={this.state.stationData}
            />
          )}
        />
        <Route exact path="/contact" render={() => <Contact />} />
        <Route exact path="/places" render={() => <PlacesHome />} />
        <Route exact path="/places/:place_id" render={() => <DisplayPlace />} />
        <Route
          exact
          path="/logout"
          render={props => (
            <LogoutForm {...props} handleLogout={this.handleLogout} />
          )}
        />
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
