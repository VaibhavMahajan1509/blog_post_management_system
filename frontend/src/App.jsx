import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import PostList from "./pages/PostList";
import AddEditPost from "./pages/AddEditPost";
import ViewPost from "./pages/ViewPost";

function App() {
  return (
    <>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<PostList />} />

        <Route path="/add-post" element={<AddEditPost />} />

        <Route path="/edit-post/:id" element={<AddEditPost />} />

        <Route path="/view-post/:id" element={<ViewPost />} />
      </Routes>
    </>
  );
}

export default App;