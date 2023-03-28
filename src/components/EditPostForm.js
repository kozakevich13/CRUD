import React, { useState, useEffect } from "react";

const EditPostForm = (props) => {
  const initialFormState = { id: null, title: "", text: "" };
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

  console.log(post);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!post.title || !post.text) return;

        props.editing ? props.updatePost(post.id, post) : props.addPost(post);
        resetAddPost();
      }}
    >
      <label>Title</label>
      <input
        type="text"
        title="title"
        value={post.title}
        onChange={handleInputChange}
      />
      <label>Text</label>
      <input
        type="text"
        title="text"
        value={post.text}
        onChange={handleInputChange}
      />
      <button>{props.editing ? "Update post" : "Add post"}</button>
      {props.editing && (
        <button
          onClick={resetAddPost}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default EditPostForm;
