import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../services/api";

import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

const ViewPost = () => {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);


  // fetch single post
  const fetchSinglePost = async () => {
    try {
      const { data } = await API.get(`/posts/${id}`);

      setPost(data.post);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch post");
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchSinglePost();
  }, [id]);


  if (loading) {
    return <Loader />;
  }


  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white shadow-md rounded-2xl p-6 md:p-8">
          <h1 className="text-4xl font-bold mb-4">
            {post.title}
          </h1>

          <div className="flex flex-col md:flex-row md:gap-10 mb-5 text-gray-600">
            <p>
              <span className="font-semibold">Author:</span>{" "}
              {post.author}
            </p>

            <p>
              <span className="font-semibold">Category:</span>{" "}
              {post.category}
            </p>
          </div>

          <div className="border-t pt-5">
            <p className="text-lg leading-8 text-gray-700 whitespace-pre-line">
              {post.content}
            </p>
          </div>

          <div className="mt-8">
            <Link
              to="/"
              className="bg-blue-600 text-white px-5 py-3 rounded-md"
            >
              Back to Posts
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewPost;