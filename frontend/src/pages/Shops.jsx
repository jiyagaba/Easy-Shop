import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { Range } from 'react-range';
import { AiFillStar } from 'react-icons/ai';
import { BsFillGridFill } from 'react-icons/bs';
import { FaThList } from 'react-icons/fa';
import ShopProducts from '../components/products/ShopProducts';
import Pagination from '../components/Pagination';
import { CiStar } from 'react-icons/ci';

const Shops = () => {
  const [filter, setFilter] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [state, setState] = useState({ values: [50, 1500] });
  const [rating, setRating] = useState('');
  const [styles, setStyles] = useState('grid');
  const [parPage, setParPage] = useState(6);
  const [pageNumber, setPageNumber] = useState(1);

  const categorys = [
    'Mobiles',
    'Laptops',
    'Speakers',
    'Top wear',
    'Footwear',
    'Watches',
    'Home Decor',
    'Smart Watches',
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        const data = await response.json();
          if (response.ok) {
            setFeaturedProducts(data);
          } else {
            console.error('Failed to fetch products');
          }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const startIndex = (pageNumber - 1) * parPage;
  const endIndex = startIndex + parPage;
  const currentProducts = featuredProducts.slice(startIndex, endIndex);

  return (
    <div>
      <Header />
      <section className='bg-[url("http://localhost:3000/images/banner/shop.png")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
        <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
          <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
            <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
              <h2 className='text-3xl font-bold'>Shop Page</h2>
              <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                <Link to='/'>Home</Link>
                <span className='pt-1'><IoIosArrowForward /></span>
                <span>Shop</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='py-16'>
        <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
          <div className={`md:block hidden ${!filter ? 'mb-6' : 'mb-0'}`}>
            <button
              onClick={() => setFilter(!filter)}
              className='text-center w-full py-2 px-3 bg-indigo-500 text-white'
            >
              Filter Product
            </button>
          </div>

          <div className='w-full flex flex-wrap'>
            <div className={`w-3/12 md-lg:w-4/12 md:w-full pr-8 bg-white ${filter ? 'md:h-0 md:overflow-hidden md:mb-6' : 'md:h-auto md:overflow-auto md:mb-0'}`}>
              <h2 className='text-3xl font-bold mb-3 text-slate-600'>Category</h2>
              <div className='py-2'>
                {categorys.map((c, i) => (
                  <div key={i} className='flex justify-start items-center gap-2 py-1'>
                    <input type='checkbox' id={c} />
                    <label className='text-slate-600 block cursor-pointer' htmlFor={c}>{c}</label>
                  </div>
                ))}
              </div>

              <h2 className='text-3xl font-bold mb-3 text-slate-600'>Price Range</h2>
              <Range
                step={10}
                min={0}
                max={2000}
                values={state.values}
                onChange={(values) => setState({ values })}
                renderTrack={({ props, children }) => (
                  <div {...props} className='w-full h-2 bg-gray-300 rounded'>{children}</div>
                )}
                renderThumb={({ props }) => (
                  <div {...props} className='w-4 h-4 bg-blue-500 rounded-full'></div>
                )}
              />
              <p className='text-slate-600'>${state.values[0]} - ${state.values[1]}</p>

              <h2 className='text-3xl font-bold mb-3 text-slate-600'>Rating</h2>
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className='flex items-center gap-2 py-1 cursor-pointer' onClick={() => setRating(star)}>
                  {[...Array(star)].map((_, i) => <AiFillStar key={i} className='text-purple-600' />)}
                  {[...Array(5 - star)].map((_, i) => <CiStar key={i} className='text-purple-300' />)}
                  <span className='text-slate-600'>{star} Star & above</span>
                </div>
              ))}
            </div>

            <div className='w-9/12 md-lg:w-8/12 md:w-full'>
              <div className='pl-8 md:pl-0'>
                <div className='py-4 bg-white mb-10 px-3 rounded-md flex justify-between items-start border'>
                  <h2 className='text-lg font-medium text-slate-600'>{featuredProducts.length} Products</h2>
                  <div className='flex justify-center items-center gap-3'>
                    <select className='p-1 border outline-0 text-purple-600 font-semibold'>
                      <option value=''>Sort By</option>
                      <option value='low-to-high'>Low to High Price</option>
                      <option value='high-to-low'>High to Low Price</option>
                    </select>
                    <div className='flex justify-center items-start gap-4 md-lg:hidden'>
                      <div onClick={() => setStyles('grid')} className={`p-2 ${styles === 'grid' ? 'bg-purple-300' : ''} text-purple-600 hover:bg-purple-300 cursor-pointer rounded-sm`}>
                        <BsFillGridFill />
                      </div>
                      <div onClick={() => setStyles('list')} className={`p-2 ${styles === 'list' ? 'bg-purple-300' : ''} text-purple-600 hover:bg-purple-300 cursor-pointer rounded-sm`}>
                        <FaThList />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='pb-8'>
                  <ShopProducts styles={styles} products={currentProducts} />
                </div>

                <div>
                  <Pagination
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    totalItem={featuredProducts.length}
                    parPage={parPage}
                    showItem={Math.ceil(featuredProducts.length / parPage)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Shops;
