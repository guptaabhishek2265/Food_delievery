import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { updateQuantity, removeFromCart } from "../redux/userSlice";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
function CartPage() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { cartItems, totalAmount } = useSelector((state) => state.user);

  const handleIncrease = (id, currentQty) => {
    dispatch(updateQuantity({ id, quantity: currentQty + 1 }));
  };

  const handleDecrease = (id, currentQty) => {
    if (currentQty > 1) {
      dispatch(updateQuantity({ id, quantity: currentQty - 1 }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="min-h-screen bg-transparent flex justify-center p-6">
        
      <div className="w-full max-w-[840px]">
        <div className="flex items-center gap-[20px] mb-6">
         <div className='' onClick={()=>navigate("/")}>
                                <MdKeyboardBackspace className='w-[25px] h-[25px] text-[#0f8b8d]'/>
                               </div>
        <h1 className="section-title text-3xl text-start">Your Cart</h1>
</div>
        {cartItems.length === 0 ? (
          <p className="text-[#6b7f7f] text-lg text-center">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="brand-panel flex items-center justify-between p-4 rounded-3xl"
                >
                  {/* Left Side: Image & Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-2xl border border-[#d5ece9]"
                    />
                    <div>
                      <h3 className="font-medium text-[#173a3a]">{item.name}</h3>
                      <p className="text-sm text-[#6b7f7f]">
                        ₹{item.price} × {item.quantity}
                      </p>
                      <p className="font-bold text-[#173a3a]">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Right Side: Qty Controls & Remove */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleDecrease(item.id, item.quantity)}
                      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      <FaMinus size={12} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleIncrease(item.id, item.quantity)}
                      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      <FaPlus size={12} />
                    </button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total & Checkout */}
            <div className="brand-panel mt-6 p-5 rounded-3xl flex justify-between items-center">
              <h3 className="text-lg font-semibold">Total Amount</h3>
              <span className="text-xl font-bold text-[#0f8b8d]">
                ₹{totalAmount.toFixed(2)}
              </span>
            </div>

            <div className="mt-4 flex justify-end">
              <button className="brand-button px-6 py-3 rounded-2xl text-lg font-semibold transition" onClick={()=>navigate("/checkout")}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;
