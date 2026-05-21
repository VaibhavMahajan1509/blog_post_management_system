import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import API from "../services/api";

import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import PostTable from "../components/PostTable";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");


  // fetch posts with filters + pagination
  const fetchPosts = async () => {
    try {
      setLoading(true);

      const { data } = await API.get(
        `/posts?page=${page}&limit=5&search=${search}&category=${category}&status=${status}`
      );

      setPosts(data.posts);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page, search, category, status]);


  // delete post
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/posts/${id}`);
      toast.success("Post deleted successfully");
      fetchPosts();
    } catch (error) {
      toast.error("Delete failed");
    }
  };


  // export csv
  const handleExport = () => {
    window.open(
      `http://localhost:5000/api/posts/export/csv?search=${search}`
    );
  };

  return (
    <>
      <Navbar handleExport={handleExport} />

      <div className="max-w-6xl mx-auto p-4">

        {/* search + filters */}
        <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between mb-5">

          {/* search input */}
          <input
            type="text"
            placeholder="Search by title, author or category"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="border border-gray-300 rounded-lg p-3 w-full md:w-1/2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* filters */}
          <div className="flex gap-3">

            {/* category */}
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 rounded-md border text-sm font-medium"
            >
              <option value="">All Categories</option>
              <option value="React">React</option>
              <option value="Node">Node</option>
              <option value="MongoDB">MongoDB</option>
            </select>

            {/* status */}
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 rounded-md border text-sm font-medium"
            >
              <option value="">All Status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>

          </div>
        </div>

        {/* table section */}
        {loading ? (
          <Loader />
        ) : (
          <>
            <PostTable posts={posts} handleDelete={handleDelete} />

            {/* pagination */}
            <div className="flex justify-center items-center gap-4 mt-6">

              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium
                hover:bg-blue-700 transition
                disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Prev
              </button>

              <span className="text-sm font-medium text-gray-700">
                Page <span className="text-blue-600">{page}</span> of{" "}
                {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium
                hover:bg-blue-700 transition
                disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Next
              </button>

            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PostList;