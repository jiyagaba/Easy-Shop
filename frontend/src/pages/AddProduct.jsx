import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdImages, IoMdCloseCircle } from "react-icons/io";

const AddProduct = () => {
  const categories = [
    { id: 1, name: 'Sports' },
    { id: 2, name: 'Tshirt' },
    { id: 3, name: 'Mobile' },
    { id: 4, name: 'Computer' },
    { id: 5, name: 'Watch' },
    { id: 6, name: 'Pant' },
  ];

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
  const [allCategory, setAllCategory] = useState(categories);
  const [searchValue, setSearchValue] = useState('');
  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);

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

  return (
    <div className='px-4 lg:px-8 py-6'>
      <div className='w-full p-6 bg-[#1e1e2f] rounded-xl border border-purple-500 shadow-[0_0_15px_#a855f7]'>
        <div className='flex justify-between items-center pb-5 border-b border-slate-700'>
          <h1 className='text-2xl font-semibold text-white'>Add Product</h1>
          <Link to="/seller-dashboard/all-product" className='bg-purple-600 hover:bg-purple-700 text-white rounded-md px-6 py-2 text-sm shadow transition'>
            All Products
          </Link>
        </div>

        <form>
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
              <label className='w-24 h-24 flex items-center justify-center bg-[#2a2a40] border border-slate-600 text-white rounded-md cursor-pointer hover:shadow-[0_0_10px_#9b5cfb]'>
                <IoMdImages className='text-xl' />
                <input type="file" multiple className='hidden' onChange={imageHandle} />
              </label>
            </div>
          </div>

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
