import React from "react";

class DisplayPlaceData extends Component {
    constructor(props) {
      super(props);
      this.state = {
        posts: []
      };
    }
  
    async componentDidMount() {
      const checkUser = await localStorage.getItem("jwt");
      if (checkUser) {
        const user = decode(checkUser);
        console.log(
          "this is user ComponentDidMount on UserProfile Component",
          user
        );
        await this.setState((prevState, newState) => ({
          currentUser: user,
          token: checkUser,
          userData: {
            user
          }
        }));
        const posts = await getUsersBlogposts(this.props.match.params.id);
        this.setState({
          posts
        });
      }
    }
    render() {
        return()
    }
}

export default withRouter(DisplayPlaceData)