import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoMdImages, IoMdCloseCircle } from "react-icons/io";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [state, setState] = useState({
    name: "",
    description: '',
    discount: '',
    price: "",
    brand: "",
    stock: ""
  });

  const [cateShow, setCateShow] = useState(false);
  const [category, setCategory] = useState('');
  const [allCategory, setAllCategory] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch categories from your API when the component mounts
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/categories");
        const data = await response.json();
        if (response.ok) {
          setCategories(data);
          setAllCategory(data); // Set all categories when data is fetched
        } else {
          setMessage("❌ Failed to load categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setMessage("❌ Error fetching categories. Please try again.");
      }
    };

    fetchCategories();
  }, []);

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const categorySearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value) {
      const filtered = categories.filter(c =>
        c.name.toLowerCase().includes(value.toLowerCase())
      );
      setAllCategory(filtered);
    } else {
      setAllCategory(categories);
    }
  };

  const imageHandle = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImageUrls = files.map(file => ({ url: URL.createObjectURL(file) }));
      setImages(prev => [...prev, ...files]);
      setImageShow(prev => [...prev, ...newImageUrls]);
    }
  };

  const changeImage = (img, index) => {
    if (img) {
      const tempImages = [...images];
      const tempUrls = [...imageShow];
      tempImages[index] = img;
      tempUrls[index] = { url: URL.createObjectURL(img) };
      setImages(tempImages);
      setImageShow(tempUrls);
    }
  };

  const removeImage = (i) => {
    const updatedImages = images.filter((_, index) => index !== i);
    const updatedUrls = imageShow.filter((_, index) => index !== i);
    setImages(updatedImages);
    setImageShow(updatedUrls);
  };

  // Function to generate slug from the product name or category
  const generateSlug = (str) => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')  // Replace non-alphanumeric characters with a dash
      .replace(/(^-|-$)/g, '');      // Remove any leading or trailing dashes
  };

  const submitProduct = async (e) => {
    e.preventDefault();
    setMessage("Submitting product...");

    // Generate a slug based on the product name (or category)
    const slug = generateSlug(category);


    // Prepare form data
    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("description", state.description);
    formData.append("discount", state.discount);
    formData.append("price", state.price);
    formData.append("brand", state.brand);
    formData.append("stock", state.stock);
    formData.append("category", category);
    formData.append("slug", slug); // Append the generated slug

    images.forEach((image, index) => {
      formData.append(`images`, image); // Append each image
    });

    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      const response = await fetch("http://localhost:3000/api/seller/add-product", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
        body: formData, // Send form data
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Product added successfully!");
        setState({
          name: "",
          description: '',
          discount: '',
          price: "",
          brand: "",
          stock: ""
        });
        setCategory('');
        setImages([]);
        setImageShow([]);
      } else {
        setMessage(`❌ ${data.message || "Failed to add product"}`);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage("❌ Error connecting to server. Please try again.");
    }
  };

  return (
    <div className='px-4 lg:px-8 py-6'>
      <div className='w-full p-6 bg-[#1e1e2f] rounded-xl border border-purple-500 shadow-[0_0_15px_#a855f7]'>
        <div className='flex justify-between items-center pb-5 border-b border-slate-700'>
          <h1 className='text-2xl font-semibold text-white'>Add Product</h1>
          <Link to="/seller-dashboard/all-product" className='bg-purple-600 hover:bg-purple-700 text-white rounded-md px-6 py-2 text-sm shadow transition'>
            All Products
          </Link>
        </div>

        <form onSubmit={submitProduct}>
          <div className='flex flex-col md:flex-row gap-4 mt-6'>
            <div className='w-full'>
              <label className='block text-sm font-medium text-white mb-1'>Product Name</label>
              <input name="name" value={state.name} onChange={inputHandle}
                placeholder="Enter product name"
                className='w-full px-4 py-2 bg-[#2a2a40] border border-slate-600 rounded-md text-white outline-none focus:shadow-[0_0_10px_#9b5cfb]' />
            </div>
            <div className='w-full'>
              <label className='block text-sm font-medium text-white mb-1'>Brand</label>
              <input name="brand" value={state.brand} onChange={inputHandle}
                placeholder="Enter brand"
                className='w-full px-4 py-2 bg-[#2a2a40] border border-slate-600 rounded-md text-white outline-none focus:shadow-[0_0_10px_#9b5cfb]' />
            </div>
          </div>

          <div className='flex flex-col md:flex-row gap-4 mt-4 relative'>
            <div className='w-full'>
              <label className='block text-sm font-medium text-white mb-1'>Category</label>
              <input readOnly value={category} placeholder="-- Select Category --"
                onClick={() => setCateShow(!cateShow)}
                className='w-full px-4 py-2 bg-[#2a2a40] border border-slate-600 rounded-md text-white cursor-pointer' />
              {cateShow && (
                <div className='absolute z-10 w-full bg-[#2a2a40] border border-slate-600 mt-2 rounded-md max-h-40 overflow-y-auto'>
                  <input
                    value={searchValue}
                    onChange={categorySearch}
                    placeholder="Search..."
                    className='w-full px-4 py-2 border-b border-slate-600 bg-[#2a2a40] text-white outline-none'
                  />
                  {allCategory.map(cat => (
                    <div key={cat.id} onClick={() => {
                      setCategory(cat.name);
                      setCateShow(false);
                    }}
                      className='px-4 py-2 hover:bg-purple-700 text-white cursor-pointer'>
                      {cat.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className='w-full'>
              <label className='block text-sm font-medium text-white mb-1'>Stock</label>
              <input name="stock" value={state.stock} onChange={inputHandle}
                placeholder="Enter stock quantity"
                className='w-full px-4 py-2 bg-[#2a2a40] border border-slate-600 rounded-md text-white outline-none focus:shadow-[0_0_10px_#9b5cfb]' />
            </div>
          </div>

          <div className='flex flex-col md:flex-row gap-4 mt-4'>
            <div className='w-full'>
              <label className='block text-sm font-medium text-white mb-1'>Price</label>
              <input name="price" value={state.price} onChange={inputHandle}
                placeholder="Enter price"
                className='w-full px-4 py-2 bg-[#2a2a40] border border-slate-600 rounded-md text-white outline-none focus:shadow-[0_0_10px_#9b5cfb]' />
            </div>
            <div className='w-full'>
              <label className='block text-sm font-medium text-white mb-1'>Discount (%)</label>
              <input name="discount" value={state.discount} onChange={inputHandle}
                placeholder="Enter discount"
                className='w-full px-4 py-2 bg-[#2a2a40] border border-slate-600 rounded-md text-white outline-none focus:shadow-[0_0_10px_#9b5cfb]' />
            </div>
          </div>

          <div className='mt-4'>
            <label className='block text-sm font-medium text-white mb-1'>Description</label>
            <textarea name="description" value={state.description} onChange={inputHandle}
              placeholder="Write product description"
              className='w-full px-4 py-2 bg-[#2a2a40] border border-slate-600 rounded-md text-white outline-none focus:shadow-[0_0_10px_#9b5cfb]' />
          </div>

          <div className='mt-4'>
            <label className='block text-sm font-medium text-white mb-1'>Product Images</label>
            <div className='flex items-center gap-4 flex-wrap'>
              {imageShow.map((img, i) => (
                <div key={i} className='relative w-24 h-24'>
                  <img src={img.url} alt="Preview" className='w-full h-full object-cover rounded-md' />
                  <input type="file" onChange={(e) => changeImage(e.target.files[0], i)}
                    className='absolute inset-0 opacity-0 cursor-pointer' />
                  <IoMdCloseCircle onClick={() => removeImage(i)}
                    className='absolute top-1 right-1 text-red-500 text-lg cursor-pointer' />
                </div>
              ))}
              <label className='w-24 h-24 flex items-center justify-center bg-[#2a2a40] border border-slate-600 text-white rounded-md cursor-pointer hover:shadow-[0_0_10px_#9b5cfb]' >
                <IoMdImages className='text-xl' />
                <input type="file" multiple className='hidden' onChange={imageHandle} />
              </label>
            </div>
          </div>

          {message && (
            <p className={`mt-4 text-lg font-semibold ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}

          <div className='mt-6'>
            <button type="submit"
              className='bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md shadow transition'>
              Submit Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
