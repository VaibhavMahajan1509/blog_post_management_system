import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { HiOutlineDocumentAdd } from "react-icons/hi";
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
      

      <div className="max-w-5xl mx-auto p-4">

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6 text-center">

          <div className="flex justify-center mb-3">
            <div className="bg-blue-100 p-3 rounded-full">
              <HiOutlineDocumentAdd
                size={32}
                className="text-blue-700"
              />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-blue-700 mb-2">
            {isEdit ? "Edit Post" : "Create New Post"}
          </h2>

          <p className="text-gray-700 text-sm">
            Fill in the details below to{" "}
            {isEdit ? "update the post" : "publish a new post"}.
          </p>
        </div>

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