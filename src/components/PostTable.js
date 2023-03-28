import React from "react";

const PostTable = (props) => (
  <table>
    <thead>
      <tr className="border-2">
        <th className="border-2 text-center pl-20 pr-20">Title</th>
        <th className="border-2 text-center pl-10 pr-10">Icon</th>
        <th className="border-2 text-center pl-20 pr-20">Text</th>
        <th className="border-2 text-center pl-20 pr-20">Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.posts.length > 0 ? (
        props.posts.map((post) => (
          <tr className="border-2" key={post.id}>


 


{/* <img className=" w-10 h-10 mt-2 rounded-full" src={post.image} alt="icon"></img> */}

            <td className="border-2 text-center pl-2 pr-2">{post.title}</td>
            <td className="flex justify-center items-center pl-2 pr-2">{post.image ? (
                    <img className="w-10 h-10 mt-2 rounded-full" src={post.image} alt="Фото" />
                ) : (
                    <p>no icon</p>
                )}
            </td>
            <td className="border-2 text-center pl-2 pr-2">{post.text}</td>
            <td className="border-2 pr-5 pl-5 " >
              <button
                className="bg-blue-500 text-white py-2 m-2 px-4 rounded hover:bg-blue-600"
                onClick={() => {
                  props.editPost(post);
                }}
              >
                Edit
              </button>

              <button
                className="bg-red-500 text-white py-2 px-4 m-2 rounded hover:bg-red-600"
                onClick={() => props.deletePost(post.id)}
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
