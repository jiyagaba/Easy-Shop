import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { IoMdImages } from "react-icons/io";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const categorys = [
        { id: 1, name: 'Sports' },
        { id: 2, name: 'Tshirt' },
        { id: 3, name: 'Mobile' },
        { id: 4, name: 'Computer' },
        { id: 5, name: 'Watch' },
        { id: 6, name: 'Pant' },
    ];

    const [state, setState] = useState({
        name: "", description: "", discount: "", price: "", brand: "", stock: "", featured: false
    });

    const [cateShow, setCateShow] = useState(false);
    const [category, setCategory] = useState('');
    const [allCategory, setAllCategory] = useState(categorys);
    const [searchValue, setSearchValue] = useState('');
    const [imageShow, setImageShow] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/products/view/${id}`);
                const data = await response.json();
                setState({
                    name: data.name || "",
                    description: data.description || "",
                    discount: data.discount || "",
                    price: data.price || "",
                    brand: data.brand || "",
                    stock: data.stock || "",
                    featured: data.featured === 1
                });
                setCategory(data.category || '');
                setImageShow([data.image ? `http://localhost:3000/uploads/${data.image}` : '']);
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
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const updatedImages = [...imageShow];
                updatedImages[index] = file;
                setImageShow(updatedImages);
            };
            reader.readAsDataURL(file);
        }
    };

    const addImageBox = () => {
        setImageShow([...imageShow, '']);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", state.name);
        formData.append("description", state.description);
        formData.append("discount", state.discount);
        formData.append("price", state.price);
        formData.append("brand", state.brand);
        formData.append("stock", state.stock);
        formData.append("category", category);
        formData.append("featured", state.featured ? 1 : 0);

        // Append each image to FormData if it's a File
        imageShow.forEach((img) => {
            if (img instanceof File) {
                formData.append('image', img);
            }
        });


        try {
            const response = await fetch(`http://localhost:3000/api/products/update/${id}`, {
                method: "PUT",
                body: formData
            });

            if (response.ok) {
                alert("Product updated successfully");
                navigate("/seller-dashboard/all-product");
            } else {
                alert("Failed to update product");
            }
        } catch (error) {
            console.error("Error updating product:", error.message);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const response = await fetch(`http://localhost:3000/api/products/${id}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    alert("Product deleted successfully");
                    navigate("/seller-dashboard/all-product");
                } else {
                    alert("Failed to delete product");
                }
            } catch (error) {
                console.error("Error deleting product:", error.message);
            }
        }
    };

    return (
        <div className="px-4 lg:px-8 pt-6 bg-[#1e1e2f] min-h-screen">
            <div className="max-w-7xl mx-auto bg-[#1e1e2f] border border-purple-500 shadow-[0_0_15px_#a855f7] rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-white text-xl font-semibold">Edit Product</h1>
                    <Link to="/seller-dashboard/all-product" className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-md shadow-md">
                        All Products
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="text-white space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-1 font-medium">Product Name</label>
                    <input name="name" value={state.name} onChange={inputHandle} placeholder="Product Name"
                        className="input w-full text-gray-900" />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Product Brand</label>
                    <input name="brand" value={state.brand} onChange={inputHandle} placeholder="Brand"
                        className="input w-full text-gray-900" />
                        </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="featured"
                            name="featured"
                            checked={state.featured}
                            onChange={(e) => setState({ ...state, featured: e.target.checked })}
                            className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <label htmlFor="featured" className="text-white text-sm cursor-pointer">Featured Product</label>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="relative">
                            <label className="block mb-1 font-medium">Category</label>
                            <input value={category} readOnly onClick={() => setCateShow(!cateShow)} placeholder="Select category"
                                className="input cursor-pointer w-full text-gray-900" />
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
                                                className={`px-4 py-2 cursor-pointer hover:bg-purple-600 ${category === c.name ? 'bg-purple-600 text-white' : ''}`} >
                                                {c.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Stock</label>
                            <input name="stock" value={state.stock} onChange={inputHandle} placeholder="Stock"
                                className="input w-full text-gray-900" />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-1 font-medium">Price</label>
                            <input name="price" type="number" value={state.price} onChange={inputHandle} placeholder="Price"
                                className="input w-full text-gray-900" />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Discount</label>
                            <input name="discount" type="number" value={state.discount} onChange={inputHandle} placeholder="Discount %"
                                className="input w-full text-gray-900" />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Description</label>
                        <textarea name="description" value={state.description} onChange={inputHandle}
                            placeholder="Description" rows="4" className="input w-full resize-none text-gray-900"></textarea>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {imageShow.map((img, i) => (
                            <div key={i} className="relative border border-slate-700 rounded-md overflow-hidden bg-[#2a2a40]">
                                <label htmlFor={`img-${i}`} className="cursor-pointer block">
                                    {img instanceof File ? (
                                        <img src={URL.createObjectURL(img)} alt={`preview-${i}`} className="w-full h-36 object-cover rounded-md" />
                                    ) : img ? (
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
