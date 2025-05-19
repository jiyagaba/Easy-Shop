import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { IoIosArrowForward } from 'react-icons/io';
import Rating from '../components/Rating..jsx';

const Review = () => {
  const { productId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/reviews/${productId}`);
      setReviews(res.data);
    } catch (err) {
      setError("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please provide a rating");
      return;
    }
    try {
      await axios.post("http://localhost:3000/api/reviews", {
        productId,
        userId: 1, // Replace with actual logged-in user ID
        rating,
        comment,
      });
      setRating(0);
      setComment("");
      fetchReviews();
    } catch (err) {
      alert("Failed to submit review");
    }
  };

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <Header />
      <section className='bg-gray-50 min-h-screen py-8'>
        <div className='w-full max-w-7xl mx-auto px-6'>
          <div className='mb-6'>
            <div className='flex items-center gap-2 text-gray-600 text-sm'>
              <Link to='/' className='hover:underline'>Home</Link>
              <IoIosArrowForward />
              <span>Product Reviews</span>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6">Product Reviews</h2>

          {reviews.length === 0 ? (
            <p>No reviews yet. Be the first to review!</p>
          ) : (
            <ul className="mb-6 space-y-6">
              {reviews.map((review) => (
                <li key={review.id} className="border rounded-lg p-4 shadow-sm bg-white">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold">{review.user_name}</p>
                    <Rating value={review.rating} />
                  </div>
                  <p className="mb-2">{review.comment}</p>
                  <p className="text-sm text-gray-500">{new Date(review.created_at).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
            <div>
              <label className="block font-semibold mb-2">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              >
                <option value={0}>Select rating</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-2">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full"
                rows={4}
                placeholder="Write your review here"
              />
            </div>
            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition-colors duration-300"
            >
              Submit Review
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Review;
