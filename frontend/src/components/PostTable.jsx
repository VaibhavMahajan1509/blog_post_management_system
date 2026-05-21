import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineDotsVertical } from "react-icons/hi";

const PostTable = ({ posts, handleDelete }) => {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="min-w-full">

        {/* table header */}
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">ID</th>
            <th className="py-3 px-4 text-left">Title</th>
            <th className="py-3 px-4 text-left">Author</th>
            <th className="py-3 px-4 text-left">Category</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Created</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>

        {/* table body */}
        <tbody>
          {posts.map((post, index) => (
            <tr
              key={post._id}
              className="border-b hover:bg-gray-50"
            >
              {/* id */}
              <td className="py-3 px-4">
                {index + 1}
              </td>

              {/* title */}
              <td className="py-3 px-4 font-medium">
                {post.title}
              </td>

              {/* author */}
              <td className="py-3 px-4">
                {post.author}
              </td>

              {/* category */}
              <td className="py-3 px-4">
                {post.category}
              </td>

              {/* status */}
              <td className="py-3 px-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    post.status === "Published"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {post.status}
                </span>
              </td>

              {/* created date */}
              <td className="py-3 px-4">
                {new Date(post.createdAt).toLocaleDateString()}
              </td>

              {/* actions */}
              <td className="py-3 px-4 text-center relative">
                <button
                  onClick={() =>
                    setOpenMenu(openMenu === post._id ? null : post._id)
                  }
                  className="p-2 hover:bg-gray-200 rounded-full"
                >
                  <HiOutlineDotsVertical size={20} />
                </button>

                {openMenu === post._id && (
                  <div className="absolute right-5 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
                    <Link
                      to={`/view-post/${post._id}`}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      View
                    </Link>

                    <Link
                      to={`/edit-post/${post._id}`}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(post._id)}
                      className="block w-full px-4 py-2 text-red-500 hover:bg-gray-100"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default PostTable;