import React from "react";

class DisplayFoodAllergen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodPosts: []
    };
  }

  async componentDidMount() {
    // const posts = await getFoodBlogposts(this.props.match.params.id);
    // this.setState({
    //   foodPosts
    // });
  }

  render() {
    return (
      <div className="contact-container">
        <h1>Allergen Name e.g. Peanuts</h1>
        <Translate />
      </div>
    );
  }
}

export default withRouter(DisplayFoodAllergen);
