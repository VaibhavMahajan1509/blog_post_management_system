import { Link, useLocation } from "react-router-dom";

const Navbar = ({ handleExport }) => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md mb-6">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <Link
          to="/"
          className="text-2xl font-bold text-black-600"
        >
          Blog Post Manager
          <p className="text-xl text-gray-400">
            Manage and organize your blog posts
          </p>
        </Link>

        <div className="flex items-center gap-3">

          {location.pathname === "/" && (
            <button
              onClick={handleExport}
              className="bg-white border border-gray-300 text-black px-4 py-2 rounded-lg"
            >
              Export CSV
            </button>
          )}

          <Link
            to="/add-post"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Add Post
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;