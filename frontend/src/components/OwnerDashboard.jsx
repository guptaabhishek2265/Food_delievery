import React from 'react'
import Nav from './Nav'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaUtensils, FaPen, FaPlus } from "react-icons/fa";
import Footer from './Footer'
import OwnerFoodCard from './OwnerFoodCard'
import { useEffect } from 'react';
import { setPendingOrdersCount } from '../redux/userSlice';

function OwnerDashboard() {
  const { shop,ownerPendingOrders } = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch=useDispatch()
useEffect(()=>{
    const pending = ownerPendingOrders.filter(order => order.shopOrder.status === "pending");
        dispatch(setPendingOrdersCount(pending.length));
},[ownerPendingOrders])
  return (
    <div className='w-full min-h-screen bg-transparent flex flex-col items-center pb-10'>
      <Nav />

      {/* If no shop */}
      {!shop && (
        <div className="flex justify-center items-center p-4 sm:p-6">
          <div className="brand-panel w-full max-w-md rounded-3xl p-8 hover:-translate-y-1 transition-all duration-300">
            <div className="flex flex-col items-center text-center">
              <FaUtensils className="text-[#0f8b8d] w-16 h-16 sm:w-20 sm:h-20 mb-4" />
              <h2 className="text-xl sm:text-2xl font-bold text-[#173a3a] mb-2">
                Add Your Restaurant
              </h2>
              <p className="text-[#5f7474] mb-4 text-sm sm:text-base">
                Join our food delivery platform and reach thousands of hungry customers every day.
              </p>
              <button
                className="brand-button px-6 py-3 rounded-full font-semibold transition duration-200"
                onClick={() => navigate("/editshop")}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}

      {/* If shop exists but no items */}
      {shop && shop?.items?.length === 0 && (
        <div className='w-full flex flex-col items-center gap-6 px-4 sm:px-6'>
          <h1 className="text-2xl sm:text-3xl text-[#173a3a] flex items-center gap-3 mt-8 text-center">
            <FaUtensils className="text-[#0f8b8d]" /> Welcome to {shop.name}
          </h1>

          {/* Shop Card */}
          <div className="brand-panel rounded-3xl overflow-hidden transition-all duration-300 w-full max-w-3xl relative">
            <button
              onClick={() => navigate("/editshop")}
              className="absolute top-4 right-4 brand-button p-3 rounded-full transition"
            >
              <FaPen />
            </button>
            <img
              src={shop.image}
              alt={shop.name}
              className="w-full h-48 sm:h-64 object-cover"
            />
            <div className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#173a3a] mb-2">{shop.name}</h2>
              <p className="text-[#6b7f7f] mb-4">{shop.city}, {shop.state}</p>
              <p className="text-gray-700 mb-4">{shop.address}</p>
              <div className="text-xs sm:text-sm text-gray-400">
                <p>Created: {new Date(shop.createdAt).toLocaleString()}</p>
                <p>Last Updated: {new Date(shop.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Add Item Section */}
          <div className="flex items-center justify-center w-full">
            <div className="brand-panel rounded-3xl p-6 sm:p-8 w-full max-w-xl text-center transition-all duration-300">
              <FaUtensils className="text-teal-600 text-4xl sm:text-5xl mx-auto mb-4" />
              <h2 className="text-xl sm:text-2xl font-bold text-[#173a3a] mb-2">Add Your Food Items</h2>
              <p className="text-[#5f7474] mb-6 text-sm sm:text-base">
                Share your delicious creations with our customers by adding them to the menu.
              </p>
              <button
                className="brand-button inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition"
                onClick={() => navigate("/additem")}
              >
                <FaPlus /> Add Item
              </button>
            </div>
          </div>
        </div>
      )}

     {/* If shop and items exist */}
{shop && shop?.items.length > 0 && (
  <div className='w-full flex flex-col gap-6 items-center px-4 sm:px-6 mb-[20px]'>
    <h1 className="text-2xl sm:text-3xl text-[#173a3a] flex items-center gap-3 mt-8 text-center">
      <FaUtensils className="text-[#0f8b8d]" /> Welcome to {shop.name}
    </h1>

    {/* Shop Card */}
    <div className="brand-panel rounded-3xl overflow-hidden transition-all duration-300 w-full max-w-3xl relative">
      <button
        onClick={() => navigate("/editshop")}
        className="absolute top-4 right-4 brand-button p-3 rounded-full transition"
      >
        <FaPen />
      </button>
      <img
        src={shop.image}
        alt={shop.name}
        className="w-full h-48 sm:h-64 object-cover"
      />
      <div className="p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#173a3a] mb-2">{shop.name}</h2>
        <p className="text-[#6b7f7f] mb-4">{shop.city}, {shop.state}</p>
        <p className="text-gray-700 mb-4">{shop.address}</p>
        <div className="text-xs sm:text-sm text-gray-400">
          <p>Created: {new Date(shop.createdAt).toLocaleString()}</p>
          <p>Last Updated: {new Date(shop.updatedAt).toLocaleString()}</p>
        </div>
      </div>
    </div>

    {/* Food Items - one per row */}
    <div className="flex flex-col items-center gap-4 w-full max-w-3xl ">
      {shop?.items.map((item, index) => (
        <OwnerFoodCard key={index} item={item} />
      ))}
    </div>
  </div>
)}


    
    </div>
  )
}

export default OwnerDashboard
