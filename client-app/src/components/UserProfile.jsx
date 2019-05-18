import React, { useState, useEffect } from "react";
import { GlobalStateConsumer } from "../contexts/GlobalState";
import decode from "jwt-decode";
import DisplayList from "./DisplayList";
import { getUsersBlogposts } from "../services/blogpostsApi";
import { Link, Route, withRouter } from "react-router-dom";
import { verifyToken } from "../services/apiHelper";

const UserProfile = props => {
  const [state, setState] = useState({ posts: [] });

  const fetchPosts = async () => {
    const posts = await getUsersBlogposts(props.match.params.id);
    setState({
      posts
    });
  };

  useEffect(() => fetchPosts(), []);

  return (
    <GlobalStateConsumer>
      {value => (
        <div className="user-profile">
          <div className="user-container">
            <div className="avatar-username">
              <h2> {this.props.userData.username} </h2>{" "}
            </div>{" "}
            <p> Email: {this.props.userData.email} </p>{" "}
            <div className="button-container">
              <button
                className="station-button"
                onClick={() =>
                  this.props.history.push(
                    `/user/${this.props.match.params.id}/edit/`
                  )
                }
              >
                Edit User{" "}
              </button>{" "}
              <button
                className="station-button"
                onClick={() =>
                  this.props.history.push(
                    `/user/${this.props.match.params.id}/post/`
                  )
                }
              >
                Add Blog Post{" "}
              </button>{" "}
            </div>{" "}
            <h1> User Posts: </h1>
            <DisplayList listData={state.posts} />
          </div>{" "}
        </div>
      )}
    </GlobalStateConsumer>
  );
};

export default withRouter(UserProfile);
