import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryAdd, categoryFetch, messageClear } from "../features/category/categorySlice";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import { FaEdit, FaTrash, FaImage } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

// Utility function to generate slug
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading or trailing hyphens
};

const Category = () => {
  const dispatch = useDispatch();
  const { categories, successMessage, errorMessage, loader } = useSelector((state) => state.category);

  const [currentPage, setCurrentPage] = useState(1);
  const [parPage, setParPage] = useState(5); // Items per page
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false); // Toggle for Add Category Form
  const [imageShow, setImageShow] = useState("");
  const [state, setState] = useState({ name: "", slug: "", image: "" });

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(categoryFetch());
  }, [dispatch]);

  // Handle Image selection
  const imageHandle = (e) => {
    let files = e.target.files;
    if (files.length > 0) {
      setImageShow(URL.createObjectURL(files[0]));
      setState({ ...state, image: files[0] });
    }
  };

  // Handle Category Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!state.name || !state.image) {
      alert("Please fill out all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("slug", state.slug); // Add slug to the form data
    formData.append("image", state.image);

    try {
      const res = await fetch("http://localhost:3000/api/categories", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(categoryAdd(data.category)); // Dispatch the category object from the API response
        setState({ name: "", slug: "", image: "" });
        setImageShow("");
        setShow(false);
      } else {
        console.error("Error adding category:", data.message);
      }
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  // Handle Delete Category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      const res = await fetch(`http://localhost:3000/api/categories/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(categoryFetch()); // Re-fetch categories after deletion
        alert("Category deleted successfully!");
      } else {
        console.error("Error deleting category:", data.message);
      }
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  // Update slug dynamically when the name changes
  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      slug: generateSlug(prevState.name),
    }));
  }, [state.name]);

  // Clear messages after 3 seconds
  useEffect(() => {
    if (successMessage || errorMessage) {
      setTimeout(() => {
        dispatch(messageClear());
      }, 3000);
    }
  }, [successMessage, errorMessage, dispatch]);

  // Filter categories by search term
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredCategories.length / parPage);

  // Get categories for the current page
  const displayedCategories = filteredCategories.slice(
    (currentPage - 1) * parPage,
    currentPage * parPage
  );

  return (
    <div className="px-2 lg:px-6 pt-6">
      {/* Add Category Button */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
        <button
          onClick={() => setShow(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
        >
          Add Category
        </button>
      </div>

      {/* Add Category Form Sidebar */}
      <div className={`w-[320px] lg:w-5/12 transition-all duration-500 fixed lg:static z-[9999] top-0 ${show ? "right-0" : "-right-[340px]"}`}>
        <div className="bg-[#1e1e2f] h-screen lg:h-auto p-5 border border-purple-500 rounded-xl text-white">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold w-full text-center">Add Category</h1>
            <div onClick={() => setShow(false)} className="block lg:hidden text-xl cursor-pointer">
              <IoMdCloseCircle />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1 mb-3">
              <label htmlFor="name">Category Name</label>
              <input
                value={state.name}
                onChange={(e) => setState({ ...state, name: e.target.value })}
                className="bg-white text-black px-4 py-2 rounded-md"
                type="text"
                id="name"
                placeholder="Enter category name"
              />
            </div>
            <div>
              <label
                htmlFor="image"
                className="flex flex-col items-center justify-center h-[238px] cursor-pointer border border-dashed hover:border-purple-500"
              >
                {imageShow ? (
                  <img className="w-full h-full object-cover" src={imageShow} alt="Preview" />
                ) : (
                  <>
                    <FaImage className="text-3xl mb-2" />
                    <span>Select Image</span>
                  </>
                )}
              </label>
              <input onChange={imageHandle} type="file" id="image" className="hidden" />
            </div>
            <button type="submit" className="bg-purple-600 hover:bg-purple-700 w-full text-white mt-4 px-4 py-2 rounded-md">
              {loader ? "Adding..." : "Add Category"}
            </button>
          </form>
        </div>
      </div>

      {/* Category Table */}
      <div className="w-full lg:w-7/12">
        <div className="w-full p-6 bg-[#1e1e2f] rounded-xl border border-purple-500 shadow-[0_0_15px_#a855f7]">
          <div className="flex justify-between items-center mb-4">
            <select
              onChange={(e) => setParPage(parseInt(e.target.value))}
              value={parPage}
              className="bg-[#2a2a3d] text-white border border-[#3e3e50] rounded-md px-4 py-2"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#2a2a3d] text-white border-[#3e3e50] rounded-md px-4 py-2"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-white">
              <thead className="uppercase border-b border-[#3e3e50]">
                <tr>
                  <th className="px-4 py-3 text-left">No</th>
                  <th className="px-4 py-3 text-left">Image</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Slug</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedCategories.map((cat, i) => (
                  <tr key={cat.id || i} className="border-b border-[#2e2e3f]">
                    <td className="px-4 py-3">{(currentPage - 1) * parPage + i + 1}</td>
                    <td className="px-4 py-3">
                      <img className="w-[45px] h-[45px] object-cover rounded" src={`http://localhost:3000${cat.image}`} alt={cat.name} />
                    </td>
                    <td className="px-4 py-3">{cat.name}</td>
                    <td className="px-4 py-3">{cat.slug}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link className="p-2 bg-yellow-500 text-white rounded">
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDelete(cat.id)}
                          className="p-2 bg-red-600 text-white rounded"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="w-full flex justify-end mt-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={filteredCategories.length}
              parPage={parPage}
              showItem={3}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;