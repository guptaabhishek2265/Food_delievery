import axios from 'axios';
import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setShop } from '../redux/userSlice';

export default function OwnerFoodCard({ item}) {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const handleDelete=async ()=>{
        try {
            const result=await axios.get(`${serverUrl}/api/item/delete/${item._id}`,{withCredentials:true})
dispatch(setShop(result.data.shop))
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className="flex w-full max-w-2xl overflow-hidden rounded-3xl border border-[#d5ece9] bg-white shadow-xl shadow-teal-900/10 transition hover:-translate-y-1 hover:border-[#0f8b8d]">
      <div className="w-36 h-[full] flex-shrink-0 bg-gray-50">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col justify-between p-3 flex-1">
        <div>
          <h3 className="text-base font-bold text-[#173a3a]">{item.name}</h3>
          <p className="text-[#5f7474] text-sm mt-1 line-clamp-2">{item.description}</p>
          <div className="mt-2 text-xs text-[#6b7f7f] space-y-1">
            <p><span className="font-medium text-gray-700">Category:</span> {item.category || 'N/A'}</p>
            <p><span className="font-medium text-gray-700">Type:</span> {item.type || 'N/A'}</p>
            <p>
              <span className="font-medium text-gray-700">Availability:</span> {item.availability ? (
                <span className="text-green-600 font-semibold">Available</span>
              ) : (
                <span className="text-red-600 font-semibold">Not Available</span>
              )}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="rounded-full bg-[#0f8b8d]/10 px-3 py-1 font-bold text-[#0f8b8d]">₹{item.price}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>navigate(`/editItem/${item._id}`)}
              className="p-2 rounded-full hover:bg-[#0f8b8d]/10 text-[#0f8b8d]"
            >
              <FiEdit size={16} />
            </button>
            <button
             
              className="p-2 rounded-full hover:bg-[#0f8b8d]/10 text-[#0f8b8d]"
              onClick={handleDelete}
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
