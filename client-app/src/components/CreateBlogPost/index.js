import React, { useState, useEffect } from "react";
//import useBlogPostForm from "../CustomHooks";
import { createBlogpost } from "../../services/blogpostsApi";

const CreateBlogPost = () => {
  const [inputs, setInputs] = useState({});
  const postSubmit = async e => {
    e.preventDefault();
    await createBlogpost(inputs);
  };

  const handleInputChange = e => {
    e.persist();
    setInputs(inputs => ({
      ...inputs,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="outer-comment">
      <form className="comment-form" onSubmit={postSubmit}>
        <h2>Blog Post</h2>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={inputs.title}
          onChange={handleInputChange}
        />

        <label htmlFor="text">Text</label>
        <input
          type="textarea"
          name="text"
          value={inputs.text}
          onChange={handleInputChange}
        />

        <button type="submit" onClick={postSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPost;
