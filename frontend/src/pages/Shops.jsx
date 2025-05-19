import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { BsFillGridFill } from 'react-icons/bs';
import { FaThList } from 'react-icons/fa';
import ShopProducts from '../components/products/ShopProducts';
import Pagination from '../components/Pagination';

const Shops = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [styles, setStyles] = useState('grid');
  const [parPage, setParPage] = useState(6);
  const [pageNumber, setPageNumber] = useState(1);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/categories');
        const data = await response.json();
        if (response.ok) {
          setCategories(data.map(cat => cat.name.toLowerCase()));
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = 'http://localhost:3000/api/products';
        const params = [];
        if (selectedCategory) {
          params.push(`categories=${selectedCategory.toLowerCase()}`);
        }
        if (sortOrder) params.push(`sort=${sortOrder}`);
        if (params.length > 0) url += "?" + params.join("&");
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          setFeaturedProducts(data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [selectedCategory, sortOrder]);

  const startIndex = (pageNumber - 1) * parPage;
  const endIndex = startIndex + parPage;
  const currentProducts = featuredProducts.slice(startIndex, endIndex);

  const handleCategoryClick = (cat) => {
    setPageNumber(1);
    setSelectedCategory(prev => (prev === cat ? '' : cat));
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header />

      <section className='bg-[url("http://localhost:3000/images/banner/shop.png")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
        <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
          <div className='w-[90%] max-w-7xl mx-auto h-full'>
            <div className='flex flex-col justify-center items-center h-full text-white'>
              <h2 className='text-3xl font-bold'>Shop Page</h2>
              <div className='flex items-center gap-2 text-lg'>
                <Link to='/' className="hover:underline">Home</Link>
                <IoIosArrowForward />
                <span>Shop</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='py-12'>
        <div className='w-[90%] max-w-7xl mx-auto'>
          {/* Filters */}
          <div className='mb-8 bg-white p-6 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow'>
            <div>
              <h2 className='text-2xl font-bold mb-2 text-slate-700'>Categories</h2>
              <div className='flex flex-wrap gap-3'>
                <span
                  className={`cursor-pointer px-4 py-2 rounded-lg border font-medium shadow-sm transition-all
                    ${selectedCategory === '' ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-purple-100'}
                  `}
                  onClick={() => handleCategoryClick('')}
                >
                  All
                </span>
                {categories.map((c, i) => (
                  <span
                    key={i}
                    className={`cursor-pointer px-4 py-2 rounded-lg border font-medium shadow-sm transition-all
                      ${selectedCategory === c ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-purple-100'}
                    `}
                    onClick={() => handleCategoryClick(c)}
                  >
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div>
                <label htmlFor='sort' className='mr-2 font-semibold text-slate-700'>Sort By Price:</label>
                <select
                  id='sort'
                  className='p-2 border text-purple-600 font-semibold rounded-md shadow-sm hover:shadow-md'
                  value={sortOrder}
                  onChange={e => setSortOrder(e.target.value)}
                >
                  <option value=''>Select</option>
                  <option value='price_asc'>Low to High</option>
                  <option value='price_desc'>High to Low</option>
                </select>
              </div>
              <div className='flex gap-2'>
                <button
                  onClick={() => setStyles('grid')}
                  className={`p-2 rounded ${styles === 'grid' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-purple-600'}`}
                  title="Grid View"
                >
                  <BsFillGridFill size={20} />
                </button>
                <button
                  onClick={() => setStyles('list')}
                  className={`p-2 rounded ${styles === 'list' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-purple-600'}`}
                  title="List View"
                >
                  <FaThList size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Product Count */}
          <div className='py-4 bg-white mb-8 px-4 rounded-xl flex justify-between items-center border shadow'>
            <h2 className='text-lg font-medium text-slate-600'>{featuredProducts.length} Products</h2>
          </div>

          {/* Products */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-600 border-solid"></div>
            </div>
          ) : (
            <>
              {currentProducts.length === 0 ? (
                <div className="text-center text-gray-500 py-16 text-xl font-semibold">
                  No products found.
                </div>
              ) : (
                <div className={`pb-8 ${styles === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8' : 'flex flex-col gap-6'}`}>
                  <ShopProducts styles={styles} products={currentProducts} />
                </div>
              )}
            </>
          )}

          <Pagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            totalItem={featuredProducts.length}
            parPage={parPage}
            showItem={Math.ceil(featuredProducts.length / parPage)}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shops;
