import React, { useState, useEffect } from "react";
import PostTable from "./components/PostTable"
import EditPostForm from "./components/EditPostForm"
import axios from "axios";

const App = () => {
  const usersData = [
    { id: 1, title: "test", text: "test" },
    { id: 2, title: "test2", text: "test2" }
  ];
  const initialFormState = { id: null, title: "", text: "" };

  const [editing, setEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState(initialFormState);
  const [data, setData] = useState(usersData);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("https://yourtestapi.com/api/posts/");
      setData(result.data);
    };
    fetchData();
  }, []);

  const addPost = (post) => {
    post.id = data.length + 1;
    setData([...data, post]);
  };

  const deletePost = (id) => {
    setEditing(false);
    setData(data.filter((post) => post.id !== id));
  };

  const editPost = (post) => {
    setEditing(true);

    setCurrentPost(post);
  };

  const updatePost = (id, updatedUser) => {
    setEditing(false);
    setData(data.map((post) => (post.id === id ? updatedUser : post)));
  };

  console.log(data)

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="flex-row">
        <div className="flex-large">
          <div>
            <h2 className="flex justify-center items-center font-semibold">{editing ? "Edit post" : "Add post"}</h2>
            <EditPostForm
              editing={editing}
              setEditing={setEditing}
              currentPost={currentPost}
              setCurrentPost={setCurrentPost}
              updatePost={updatePost}
              addPost={addPost}
            />
          </div>
        </div>
        <div >
          <h2 className="text-center font-semibold mb-2">View data</h2>
          <div className="flex justify-center items-center"> 
           <PostTable posts={data} editPost={editPost} deletePost={deletePost} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
