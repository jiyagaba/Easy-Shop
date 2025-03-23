import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { Star } from 'lucide-react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Rating from '../components/Rating.';
import Reviews from '../components/Reviews';

const products = [
    { id: 1, title: 'Product 1', price: 490, rating: 4.8, img: '1.webp', discount: 10, images: ['/images/products/1.webp', '/images/products/1-2.webp'], reviews: 120, description: 'High-quality product 1' },
    { id: 2, title: 'Product 2', price: 420, rating: 4.2, img: '2.webp', discount: 5, images: ['/images/products/2.webp', '/images/products/2-2.webp'], reviews: 80, description: 'Best-selling product 2' }
];

const Details = () => {
    const { id } = useParams();
    const product = products.find((p) => p.id === Number(id));
    const [selectedImage, setSelectedImage] = useState(product?.images?.[0] || product?.img || '');
    const [state, setState] = useState('reviews');

    if (!product) {
        return <h2 className='text-center text-red-500'>Product not found</h2>;
    }

    const discountedPrice = product.discount ? product.price - (product.price * product.discount) / 100 : product.price;

    return (
        <div>
            <Header />
            <section className='bg-gray-200 py-6'>
                <div className='container mx-auto flex flex-col items-center'>
                    <h2 className='text-3xl font-bold'>Product Details</h2>
                    <div className='flex items-center gap-2 text-lg text-gray-600'>
                        <Link to='/'>Home</Link>
                        <IoIosArrowForward />
                        <span>{product.title}</span>
                    </div>
                </div>
            </section>

            <section className='container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div>
                    <img src={selectedImage} alt='Product' className='w-full h-96 object-cover rounded-lg shadow-md' />
                    <div className='flex gap-2 mt-4 justify-center'>
                        {product.images?.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt='Thumbnail'
                                className='w-16 h-16 cursor-pointer border-2 border-transparent hover:border-gray-500 rounded-lg'
                                onClick={() => setSelectedImage(img)}
                            />
                        ))}
                    </div>
                </div>
                
                <div className='p-6 space-y-4 border rounded-lg shadow-lg bg-white'>
                    <h2 className='text-2xl font-bold'>{product.title}</h2>
                    <div className='flex items-center gap-2 text-yellow-500'>
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} fill={i < product.rating ? 'currentColor' : 'none'} stroke='currentColor' />
                        ))}
                        <span className='text-gray-600'>({product.reviews} reviews)</span>
                    </div>
                    <p className='text-gray-700'>{product.description}</p>
                    <div className='flex items-center gap-4'>
                        <span className='text-2xl font-semibold'>${discountedPrice.toFixed(2)}</span>
                        {product.discount && (
                            <>
                                <span className='text-gray-500 line-through'>${product.price.toFixed(2)}</span>
                                <span className='bg-red-500 text-white px-2 py-1 text-sm rounded'>{product.discount}% OFF</span>
                            </>
                        )}
                    </div>
                    <div className='flex gap-4'>
                        <button className='bg-blue-600 text-white px-4 py-2 rounded'>Add to Cart</button>
                        <button className='bg-green-600 text-white px-4 py-2 rounded'>Buy Now</button>
                    </div>
                </div>
            </section>

            <section className='container mx-auto p-6'>
                <div className='flex gap-4'>
                    <button onClick={() => setState('reviews')} className={`px-5 py-2 rounded ${state === 'reviews' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}>Reviews</button>
                    <button onClick={() => setState('description')} className={`px-5 py-2 rounded ${state === 'description' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}>Description</button>
                </div>
                <div className='mt-4'>
                    {state === 'reviews' ? <Reviews /> : <p className='text-gray-700'>{product.description}</p>}
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Details;