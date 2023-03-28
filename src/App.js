import React, { useState, useEffect } from "react";
import UserTable from "/src/components/UserTable";
import EditUserForm from "/src/components/EditUserForm";
import axios from "axios";
import "./tailwind.output.css";

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

  return (
    <div className="container">
      <h1>CRUD App</h1>
      <div className="flex-row">
        <div className="flex-large">
          <div>
            <h2>{editing ? "Edit post" : "Add post"}</h2>
         
          </div>
        </div>
        <div className="flex-large">
          <h2>View data</h2>
         
        </div>
      </div>
    </div>
  );
};

export default App;
