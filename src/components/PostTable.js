import React from "react";

const PostTable = (props) => (
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>text</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.posts.length > 0 ? (
        props.posts.map((post) => (
          <tr key={post.id}>
            {/* <td>{post.name}</td>
            <td>{post.username}</td> */}

            <td>{post.title}</td>
            <td>{post.text}</td>
            <td>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={() => {
                  props.editRow(post);
                }}
              >
                Edit
              </button>

              <button
                className="button muted-button"
                onClick={() => props.deleteUser(post.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No data</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default PostTable;
