import React, { useState } from "react";

//CUSTOM HOOKS FOR BLOGPOSTS
const useBlogPostForm = callback => {
  const [inputs, setInputs] = useState({});
  const handleSubmit = e => {
    if (e) {
      e.preventDefault();
    }
    callback();
  };
  const handleInputChange = e => {
    e.persist();
    setInputs(inputs => ({
      ...inputs,
      [e.target.name]: e.target.value
    }));
  };
  return {
    handleSubmit,
    handleInputChange,
    inputs
  };
};
export default useBlogPostForm;
