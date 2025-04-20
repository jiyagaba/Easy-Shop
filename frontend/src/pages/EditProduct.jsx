import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { IoMdImages } from "react-icons/io";

const EditProduct = () => {
    const { id } = useParams(); // Get product ID from the URL
    const navigate = useNavigate(); // For navigation after update or delete

    const categorys = [
        { id: 1, name: 'Sports' },
        { id: 2, name: 'Tshirt' },
        { id: 3, name: 'Mobile' },
        { id: 4, name: 'Computer' },
        { id: 5, name: 'Watch' },
        { id: 6, name: 'Pant' },
    ];

    const [state, setState] = useState({
        name: "", description: '', discount: '', price: "", brand: "", stock: ""
    });

    const [cateShow, setCateShow] = useState(false);
    const [category, setCategory] = useState('');
    const [allCategory, setAllCategory] = useState(categorys);
    const [searchValue, setSearchValue] = useState('');
    const [imageShow, setImageShow] = useState([]);

    // Fetch product details when the component loads
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/products/${id}`);
                const data = await response.json();
                setState({
                    name: data.name,
                    description: data.description,
                    discount: data.discount,
                    price: data.price,
                    brand: data.brand,
                    stock: data.stock
                });
                setCategory(data.category);
                setImageShow(data.images || []); // Assuming `images` is an array of image URLs
            } catch (error) {
                console.error("Error fetching product:", error.message);
            }
        };

        fetchProduct();
    }, [id]);

    const inputHandle = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const categorySearch = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        setAllCategory(value ? categorys.filter(c => c.name.toLowerCase().includes(value.toLowerCase())) : categorys);
    };

    const changeImage = (img, files, index) => {
        if (files.length > 0) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const updatedImages = [...imageShow];
                updatedImages[index] = reader.result;
                setImageShow(updatedImages);
            };
            reader.readAsDataURL(files[0]);
        }
    };

    const addImageBox = () => {
        setImageShow([...imageShow, '']);
    };

    // Handle form submission to update the product
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/api/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...state,
                    category,
                }),
            });

            if (response.ok) {
                alert("Product updated successfully");
                navigate("/seller/dashboard/products"); // Redirect to the products page
            } else {
                alert("Failed to update product");
            }
        } catch (error) {
            console.error("Error updating product:", error.message);
        }
    };

    // Handle product deletion
    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const response = await fetch(`http://localhost:3000/api/products/${id}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    alert("Product deleted successfully");
                    navigate("/seller/dashboard/products"); // Redirect to the products page
                } else {
                    alert("Failed to delete product");
                }
            } catch (error) {
                console.error("Error deleting product:", error.message);
            }
        }
    };

    return (
        <div className="px-4 lg:px-8 pt-6">
            <div className="bg-[#1e1e2f] border border-purple-500 shadow-[0_0_15px_#a855f7] rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-white text-lg font-semibold">Edit Product</h1>
                    <Link to="/seller/dashboard/products" className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-md shadow-md">
                        All Products
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="text-white space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name">Product Name</label>
                            <input id="name" name="name" value={state.name} onChange={inputHandle} placeholder="Product Name"
                                className="w-full px-4 py-2 mt-1 bg-[#2a2a40] border border-slate-700 rounded-md outline-none focus:border-purple-500" />
                        </div>
                        <div>
                            <label htmlFor="brand">Product Brand</label>
                            <input id="brand" name="brand" value={state.brand} onChange={inputHandle} placeholder="Brand Name"
                                className="w-full px-4 py-2 mt-1 bg-[#2a2a40] border border-slate-700 rounded-md outline-none focus:border-purple-500" />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="relative">
                            <label htmlFor="category">Category</label>
                            <input id="category" value={category} readOnly onClick={() => setCateShow(!cateShow)} placeholder="--select category--"
                                className="w-full px-4 py-2 mt-1 bg-[#2a2a40] border border-slate-700 rounded-md outline-none cursor-pointer" />
                            {cateShow && (
                                <div className="absolute top-full z-10 w-full bg-[#1e1e2f] border border-slate-700 mt-1 rounded-md">
                                    <input
                                        value={searchValue}
                                        onChange={categorySearch}
                                        placeholder="Search category"
                                        className="w-full px-3 py-2 bg-transparent border-b border-slate-700 outline-none"
                                    />
                                    <div className="max-h-[150px] overflow-y-auto">
                                        {allCategory.map((c, i) => (
                                            <div key={i} onClick={() => {
                                                setCategory(c.name);
                                                setCateShow(false);
                                                setSearchValue('');
                                                setAllCategory(categorys);
                                            }}
                                                className={`px-4 py-2 cursor-pointer hover:bg-purple-600 ${category === c.name ? 'bg-purple-600 text-white' : ''}`}>
                                                {c.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div>
                            <label htmlFor="stock">Product Stock</label>
                            <input id="stock" name="stock" value={state.stock} onChange={inputHandle} placeholder="Stock"
                                className="w-full px-4 py-2 mt-1 bg-[#2a2a40] border border-slate-700 rounded-md outline-none focus:border-purple-500" />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="price">Price</label>
                            <input id="price" name="price" type="number" value={state.price} onChange={inputHandle} placeholder="Price"
                                className="w-full px-4 py-2 mt-1 bg-[#2a2a40] border border-slate-700 rounded-md outline-none focus:border-purple-500" />
                        </div>
                        <div>
                            <label htmlFor="discount">Discount</label>
                            <input id="discount" name="discount" type="number" value={state.discount} onChange={inputHandle} placeholder="Discount by %"
                                className="w-full px-4 py-2 mt-1 bg-[#2a2a40] border border-slate-700 rounded-md outline-none focus:border-purple-500" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea id="description" name="description" value={state.description} onChange={inputHandle}
                            placeholder="Description" rows="4"
                            className="w-full px-4 py-2 mt-1 bg-[#2a2a40] border border-slate-700 rounded-md outline-none focus:border-purple-500"></textarea>
                    </div>

                    {/* Image grid section */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {imageShow.map((img, i) => (
                            <div key={i} className="relative border border-slate-700 rounded-md overflow-hidden bg-[#2a2a40]">
                                <label htmlFor={`img-${i}`} className="cursor-pointer block">
                                    {img ? (
                                        <img src={img} alt={`preview-${i}`} className="w-full h-36 object-cover rounded-md" />
                                    ) : (
                                        <div className="flex items-center justify-center w-full h-36 text-slate-400">
                                            <IoMdImages size={40} />
                                        </div>
                                    )}
                                </label>
                                <input id={`img-${i}`} type="file" className="hidden" onChange={(e) => changeImage(img, e.target.files, i)} />
                            </div>
                        ))}
                        <div onClick={addImageBox} className="cursor-pointer border border-dashed border-purple-500 bg-[#2a2a40] text-purple-400 hover:bg-purple-600 flex items-center justify-center h-36 rounded-md transition">
                            + Add Image
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <button type="button" onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md shadow-md">
                            Delete Product
                        </button>
                        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md shadow-md">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;