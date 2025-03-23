import React,{useEffect} from 'react'
import Header from '../components/Header'
import Banner from '../components/Banner'
import Category from '../components/Category'
import FeatureProducts from '../components/products/FeatureProducts'
import Products from '../components/Product'
import DiscountedProducts from '../components/DiscountedProducts'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux';
import { get_category } from '../store/reducers/homeReducer';
function Home() {
  const dispatch = useDispatch()
    const {categorys} = useSelector(state => state.home)
    useEffect(() => {
        dispatch(get_category())
    },[])
  return (
    <div className='w-full'>
        <Header/>
        <Banner/>
        <Category/>
        <FeatureProducts/>
        <Products/>
        <DiscountedProducts/>
        
        <Footer/>


        
      
    </div>
  )
}

export default Home
