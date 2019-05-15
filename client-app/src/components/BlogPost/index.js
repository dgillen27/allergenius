import React from "react";
import useBlogPostForm from "../CustomHooks";
import { createBlogpost } from ".../services/blogpostsApi";

export const BlogPost = () => {
  const submitBlogPost = () => {};

  return (
    <div className="outer-comment">
      <form className="comment-form" onSubmit={handleSubmit}>
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

        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};
