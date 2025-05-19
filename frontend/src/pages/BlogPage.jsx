import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle } from 'lucide-react';
import Header from '../components/Header';

const initialBlogs = [
  {
    id: 1,
    title: 'My First Blog Post',
    content: 'This is the content of my very first blog post. I am excited to share my thoughts and experiences with the world!',
    imageUrl: 'https://source.unsplash.com/random/600x400?sig=1',
    createdAt: 'Wed Jul 22 2020',
  },
  {
    id: 2,
    title: 'Post 2 Headline',
    content: 'Sample small text. Lorem ipsum dolor sit amet.',
    imageUrl: 'https://source.unsplash.com/random/600x400?sig=2',
    createdAt: 'Wed Jul 22 2020',
  },
  {
    id: 3,
    title: 'Post 3 Headline',
    content: 'Sample small text. Lorem ipsum dolor sit amet.',
    imageUrl: 'https://source.unsplash.com/random/600x400?sig=3',
    createdAt: 'Wed Jul 22 2020',
  },
  {
    id: 4,
    title: 'Another Interesting Article',
    content: 'More insightful content for you to enjoy and learn from. Stay tuned for more updates!',
    imageUrl: 'https://source.unsplash.com/random/600x400?sig=4',
    createdAt: 'Tue Jul 21 2020',
  },
  {
    id: 5,
    title: 'The Wonders of Nature',
    content: 'Explore the beauty and diversity of our natural world. From majestic mountains to serene oceans.',
    imageUrl: 'https://source.unsplash.com/random/600x400?sig=5',
    createdAt: 'Mon Jul 20 2020',
  },
  {
    id: 6,
    title: 'Tips for Productivity',
    content: 'Learn effective strategies to boost your productivity and achieve your goals. Time management and focus are key.',
    imageUrl: 'https://source.unsplash.com/random/600x400?sig=6',
    createdAt: 'Sun Jul 19 2020',
  },
];

const BlogCard = ({ blog }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-md shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer max-w-[280px] mx-auto"
      onClick={() => window.open(`/blog/${blog.id}`, '_blank')}
    >
      <img
        src={blog.imageUrl || 'https://source.unsplash.com/random/600x400'}
        alt={blog.title}
        className="w-full aspect-square object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{blog.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{blog.content}</p>
        <p className="text-gray-500 text-xs">{blog.createdAt}</p>
        <button className="bg-purple-500 text-white py-2 px-4 rounded-md mt-2 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm font-medium">
          Read More
        </button>
      </div>
    </motion.div>
  );
};

const SimpleBlogPage = () => {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [newBlog, setNewBlog] = useState({ title: '', content: '', imageUrl: '' });
  const [isCreating, setIsCreating] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/blogs');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleCreateBlog = async () => {
    if (!newBlog.title.trim() || !newBlog.content.trim()) {
      alert('Please fill in both title and content!');
      return;
    }

    setIsCreating(true);
    try {
      const response = await fetch('http://localhost:3000/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBlog),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const createdBlog = await response.json();
      setBlogs((prevBlogs) => [createdBlog, ...prevBlogs]);
      setNewBlog({ title: '', content: '', imageUrl: '' });
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('Failed to create blog');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
       <section className="bg-indigo-100 py-16 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Explore our Blog page</h2>
        <p className="text-lg text-gray-600">Level Up Your Fashion Game</p>
      </section>
      <div className="py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-center mb-6">
           
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-purple-500 text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-full p-2 shadow-md transition-colors duration-300"
            >
              <PlusCircle className="w-6 h-6" />
            </button>
          </div>

          <AnimatePresence>
            {showCreateForm && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-md shadow-md p-6 mb-6"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Post</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Blog Title"
                    value={newBlog.title}
                    onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                  <textarea
                    placeholder="Blog Content"
                    value={newBlog.content}
                    onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md min-h-[80px] focus:ring-purple-500 focus:border-purple-500"
                  />
                  <input
                    type="text"
                    placeholder="Image URL (Optional)"
                    value={newBlog.imageUrl}
                    onChange={(e) => setNewBlog({ ...newBlog, imageUrl: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                  <button
                    onClick={handleCreateBlog}
                    disabled={isCreating}
                    className={`w-full bg-purple-500 text-white font-semibold py-3 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                  >
                    {isCreating ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 mr-3"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Publishing...
                      </>
                    ) : (
                      <>
                        <PlusCircle className="w-5 h-5" />
                        Publish Post
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Blog List */}
          <div
            className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4"
            style={{ gridAutoFlow: 'row' }}
          >
            <AnimatePresence>
              {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleBlogPage;
