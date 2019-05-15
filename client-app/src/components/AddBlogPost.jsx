// import React, { useState } from "react";
// import { createBlogpost } from "../services/blogpostsApi";
// import { withRouter, Link } from "react-router-dom";
// import { Button } from "./Button";

// export function AddBlogPost({cityList}) {
//   const [postData, setPostData] = useState({
//     cityName: "",
//     date: "",
//     title: "",
//     text: ""
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//   setPostData(...postData,{[name]: value});
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const cityId = cityList.cities
//       .filter(city => city.name === postData.cityName)
//       .map(city => city.id);
//     const resp = await createBlogpost(
//       props.match.params.id,
//       cityId[0],
//       postData.text,
//       postData.title
//     );
//    props.history.push(
//       `/user/${this.props.userData.id}/username/${this.props.userData.username}`
//     );
//   }

//   useEffect(() => {
//     document.title = `You clicked ${count} times`;
//   }, [count])

//   setState(
//     postData: {
//       ...prevState.postData
//     }
//   }))) ;

//   render() {
//     return (
//       <div className="outer-comment">
//         <form className="comment-form" onSubmit={handleSubmit}>
//           <h2>Blog Post</h2>

//           <label htmlFor="title">Title</label>
//           <div className="title-container">
//             <input
//               type="text"
//               name="title"
//               value={this.state.title}
//               id="title"
//               onChange={handleChange}
//             />
//           </div>
//           {/* <Button onClick={() => whatever()}>
//             left button
//           </Button>
//           <Button primary onClick={() => whatever()}>
//             right button
//           </Button> */}
//           <label htmlFor="text">Text</label>
//           <div className="text-container">
//             <input
//               type="textarea"
//               name="text"
//               value={this.state.text}
//               id="text"
//               onChange={handleChange}
//             />
//           </div>
//           <button type="submit" onClick={handleSubmit}>
//             Submit
//           </button>
//         </form>
//       </div>
//     );
//   }
// }

// export default withRouter(AddBlogPost);
