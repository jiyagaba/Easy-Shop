import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Reviews from "../components/Reviews";

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [state, setState] = useState("reviews");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3000/api/products/view/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product");

        const data = await response.json();
        setProduct(data);

        const firstImage = data.images?.length > 0 ? data.images[0] : data.img || "";
        setSelectedImage(firstImage);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">Loading product details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!product) return <p className="text-center text-red-500">Product not found</p>;

  const price = Number(product.price) || 0;
  const discountedPrice = product.discount ? price - (price * product.discount) / 100 : price;

  return (
    <div className="bg-white min-h-screen flex flex-col items-center">
      <Header />
      <section className="w-full max-w-6xl flex flex-col md:flex-row gap-10 bg-white rounded-lg shadow-lg p-8 mt-10">
        {/* Product Image */}
        <div className="flex flex-col items-center md:w-1/2 order-1 md:order-1">
          <img
            src={selectedImage}
            alt="Product"
            className="w-full max-w-md h-auto rounded-lg shadow-md object-contain"
            onError={(e) => {
              e.target.src = "/images/default-product.png";
            }}
          />
          <div className="flex gap-4 mt-4 overflow-x-auto w-full justify-center">
            {product.images && product.images.length > 0 ? (
              product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Thumbnail"
                  className="w-20 h-20 cursor-pointer border-2 border-transparent hover:border-purple-600 rounded-lg object-contain"
                  onClick={() => setSelectedImage(img)}
                  onError={(e) => {
                    e.target.src = "/images/default-product.png";
                  }}
                />
              ))
            ) : product.img ? (
              <img
                src={product.img}
                alt="Thumbnail"
                className="w-20 h-20 cursor-pointer border-2 border-transparent hover:border-purple-600 rounded-lg object-contain"
                onClick={() => setSelectedImage(product.img)}
                onError={(e) => {
                  e.target.src = "/images/default-product.png";
                }}
              />
            ) : (
              <img
                src="/images/default-product.png"
                alt="Default Thumbnail"
                className="w-20 h-20 rounded-lg object-contain"
              />
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 flex flex-col justify-between order-2 md:order-2">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-black">{product.title}</h2>
            <p className="text-black mb-6">{product.description}</p>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-semibold text-black">₹{discountedPrice.toFixed(2)}</span>
              {product.discount && (
                <>
                  <span className="text-gray-500 line-through">₹{price.toFixed(2)}</span>
                  <span className="bg-purple-600 text-white px-2 py-1 rounded">{product.discount}% OFF</span>
                </>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded shadow transition duration-300">
              Add to Cart
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded shadow transition duration-300">
              Buy Now
            </button>
          </div>
        </div>
      </section>

      {/* Reviews & Description Tabs */}
      <section className="w-full max-w-6xl mt-10 bg-white rounded-lg shadow-lg p-6">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setState("reviews")}
            className={`px-5 py-2 rounded ${
              state === "reviews" ? "bg-purple-600 text-white" : "bg-gray-300 text-black"
            }`}
          >
            Reviews
          </button>
          <button
            onClick={() => setState("description")}
            className={`px-5 py-2 rounded ${
              state === "description" ? "bg-purple-600 text-white" : "bg-gray-300 text-black"
            }`}
          >
            Description
          </button>
        </div>
        <div className="mt-4">
          {state === "reviews" ? (
            <Reviews />
          ) : (
            <p className="text-black">{product.description}</p>
          )}
        </div>
      </section>

    </div>
  );
};

export default Details;
