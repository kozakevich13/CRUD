import React, { useState, useEffect } from "react";

const EditPostForm = (props) => {
  const initialFormState = { id: "", title: "", image: "", text: "", url: "" };
  const [post, setPost] = useState(
    props.editing ? props.currentPost : initialFormState
  );


  const handleInputChange = (event) => {
    const { title, value } = event.target;
    setPost({ ...post, [title]: value });
  };

  useEffect(() => {
    setPost(props.currentPost);
  }, [props]);

  const resetAddPost = () => {
    props.setEditing(false);
    setPost(initialFormState);
    props.setCurrentPost(initialFormState);
  };


  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!post.title || !post.text || !post.url ) return;

        props.editing ? props.updatePost(post.id, post) : props.addPost(post);
        resetAddPost();
      }}
      className="flex justify-center items-center"
    >
      <label className="m-2 font-semibold">Title:</label>
      <input
        className="border-2"
        type="text"
        title="title"
        value={post.title}
        onChange={handleInputChange}
      />
      <label className="m-2 font-semibold">Icon:</label>
      <input
        className="border-2"
        type="text"
        title="image"
        value={post.image}
        onChange={handleInputChange}
      />
      <label className="m-2 font-semibold">Text:</label>
      <input
        className="border-2"
        type="text"
        title="text"
        value={post.text}
        onChange={handleInputChange}
      />
      <label className="m-2 font-semibold">URL:</label>
      <input
        className="border-2"
        type="text"
        title="url"
        value={post.url}
        onChange={handleInputChange}
      />
      

      <button className="bg-green-500 text-white py-2 px-4 m-2 rounded hover:bg-green-600">{props.editing ? "Update post" : "Add post"}</button>
      {props.editing && (
        <button
          onClick={resetAddPost}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default EditPostForm;
