const PostForm = ({
  register,
  handleSubmit,
  errors,
  onSubmit,
  isEdit,
  submitting,
}) => {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-md rounded-2xl p-6 md:p-8"
    >
      
      
      {/* basic info */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-5 border-b pb-3">
          Basic Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* title */}
          <div>
            <label className="block mb-2 font-medium">
              Title
            </label>

            <input
              type="text"
              placeholder="Enter post title"
              {...register("title", {
                required: "Title is required",
              })}
              className="w-full border border-gray-300 rounded-lg p-3"
            />

            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* author */}
          <div>
            <label className="block mb-2 font-medium">
              Author Name
            </label>

            <input
              type="text"
              placeholder="Enter author name"
              {...register("author", {
                required: "Author name is required",
              })}
              className="w-full border border-gray-300 rounded-lg p-3"
            />

            {errors.author && (
              <p className="text-red-500 text-sm mt-1">
                {errors.author.message}
              </p>
            )}
          </div>

          {/* email */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter email address"
              {...register("email", {
                required: "Email is required",
              })}
              className="w-full border border-gray-300 rounded-lg p-3"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
      </div>


      {/* classification */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-5 border-b pb-3">
          Classification
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* category */}
          <div>
            <label className="block mb-2 font-medium">
              Category
            </label>

            <input
              type="text"
              placeholder="Enter category"
              {...register("category", {
                required: "Category is required",
              })}
              className="w-full border border-gray-300 rounded-lg p-3"
            />

            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* tags */}
          <div>
            <label className="block mb-2 font-medium">
              Tags
            </label>

            <input
              type="text"
              placeholder="Example: react, node, mongodb"
              {...register("tags")}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          {/* status */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">
              Status
            </label>

            <select
              {...register("status")}
              className="w-full border border-gray-300 rounded-lg p-3"
            >
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>
      </div>


      {/* media */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-5 border-b pb-3">
          Media
        </h2>

        <div>
          <label className="block mb-2 font-medium">
            Thumbnail URL
          </label>

          <input
            type="text"
            placeholder="Paste image URL"
            {...register("thumbnail")}
            className="w-full border border-gray-300 rounded-lg p-3"
          />
        </div>
      </div>


      {/* content */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-5 border-b pb-3">
          Content
        </h2>

        <div className="space-y-5">

          {/* short description */}
          <div>
            <label className="block mb-2 font-medium">
              Short Description
            </label>

            <textarea
              rows="3"
              placeholder="Write short description..."
              {...register("shortDescription", {
                required: "Short description is required",
              })}
              className="w-full border border-gray-300 rounded-lg p-3"
            />

            {errors.shortDescription && (
              <p className="text-red-500 text-sm mt-1">
                {errors.shortDescription.message}
              </p>
            )}
          </div>

          {/* content */}
          <div>
            <label className="block mb-2 font-medium">
              Post Content
            </label>

            <textarea
              rows="8"
              placeholder="Write full post content..."
              {...register("content", {
                required: "Content is required",
              })}
              className="w-full border border-gray-300 rounded-lg p-3"
            />

            {errors.content && (
              <p className="text-red-500 text-sm mt-1">
                {errors.content.message}
              </p>
            )}
          </div>
        </div>
      </div>


      {/* submit button */}
      <button
        type="submit"
        disabled={submitting}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {submitting
          ? "Submitting..."
          : isEdit
          ? "Update Post"
          : "Publish Post"}
      </button>
    </form>
  );
};

export default PostForm;