import React, { useState, useEffect } from "react";
import PostTable from "./components/PostTable"
import EditPostForm from "./components/EditPostForm"
import axios from "axios";

const App = () => {
  const initialFormState = { id: null, title: "", text: "", image: "", url: "" };
  const [editing, setEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState(initialFormState);
  const [data, setData] = useState([]);
  const URL = 'https://yourtestapi.com/api/posts/'

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(URL);
      setData(result.data);
    };
    fetchData();
  }, []);

  const addPost = (post) => {
    axios.post(URL, {
      id: '',
      title: post.title,
      text: post.text,
      image: post.image,
      url: post.url,
      active: 1,
      sort_order: 1,
      created_at: '',
      updated_at: '',
      deleted_at: null
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      setData([...data, response.data]);
    })
    .catch(error => {
      console.error(error);
    });
  
  };
  
  const deletePost = (id) => {
    axios.delete(`${URL}${id}`, {
    })
    .then(response => {
        setData(data.filter((post) => post.id !== id));
    })
    .catch(error => {
        console.log('Error:', error);
    });
    setData(data)
  };

  const editPost = (post) => {
    setEditing(true);
    setCurrentPost(post);
  };

  const updatePost = async (id, updatedData) => {
    setEditing(false);
    try {
      const response = await axios.put(
        `${URL}${id}`,
        updatedData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      setData(data.map((post) => (post.id === id ? updatedData : post)));
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

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
