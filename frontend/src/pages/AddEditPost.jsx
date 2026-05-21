import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../services/api";

import Navbar from "../components/Navbar";
import PostForm from "../components/PostForm";

const AddEditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();


  // load post when editing
  const fetchSinglePost = async () => {
    try {
      const { data } = await API.get(`/posts/${id}`);

      reset({
        title: data.post.title,
        author: data.post.author,
        email: data.post.email,
        category: data.post.category,
        tags: data.post.tags,
        status: data.post.status,
        thumbnail: data.post.thumbnail,
        shortDescription: data.post.shortDescription,
        content: data.post.content,
      });
    } catch (error) {
      toast.error("Failed to load post");
    }
  };

  useEffect(() => {
    if (isEdit) {
      fetchSinglePost();
    }
  }, [id]);


  // submit handler (create / update)
  const onSubmit = async (formData) => {
    try {
      setSubmitting(true);

      if (isEdit) {
        await API.put(`/posts/${id}`, formData);
        toast.success("Post updated successfully");
      } else {
        await API.post("/posts", formData);
        toast.success("Post created successfully");
      }

      navigate("/");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto p-4">
        <h2 className="text-3xl font-bold mb-2">
          {isEdit ? "Edit Post" : "Add New Post"}
        </h2>

        <p className="text-gray-500 mb-8">
          Manage and organize your blog content professionally.
        </p>

        <PostForm
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          onSubmit={onSubmit}
          isEdit={isEdit}
          submitting={submitting}
        />
      </div>
    </>
  );
};

export default AddEditPost;