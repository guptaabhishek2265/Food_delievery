import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";


export default function OrderPlaced() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-transparent flex flex-col justify-center items-center px-4 text-center relative overflow-hidden">
      <FaCheckCircle className="text-green-500 text-6xl mb-4" />
      <h1 className="text-3xl font-bold text-[#173a3a] mb-2">Order Placed!</h1>
      <p className="text-[#5f7474] max-w-md mb-6">
        Thank you for your purchase. Your order is being prepared.  
        You can track your order status in the "My Orders" section.
      </p>
      <button
        onClick={() => navigate("/my-orders")}
        className="brand-button px-6 py-3 rounded-2xl text-lg font-medium transition"
      >
        Back to My Orders
      </button>

    
    </div>
  );
}
