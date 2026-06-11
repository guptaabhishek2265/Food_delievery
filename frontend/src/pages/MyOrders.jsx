import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setMyOrders } from "../redux/userSlice";
import { MdKeyboardBackspace } from "react-icons/md";

export default function MyOrders() {
  const { myOrders, socket } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/order/getmy`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setMyOrders(res.data.orders));
          console.log(res.data.orders);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // socket listener
  useEffect(() => {
    if (!socket) return;
    const handleStatusUpdated = (data) => {
      dispatch(
        setMyOrders(
          myOrders.map((order) => {
            if (order._id === data.orderId) {
              return {
                ...order,
                shopOrders: order.shopOrders.map((so) =>
                  so._id === data.shopOrder._id
                    ? { ...so, ...data.shopOrder }
                    : so
                ),
              };
            }
            return order;
          })
        )
      );
    };

    socket.on("orders:statusUpdated", handleStatusUpdated);

    return () => {
      socket.off("orders:statusUpdated", handleStatusUpdated);
    };
  }, [socket, myOrders, dispatch]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (!loading && myOrders?.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-[#5f7474] mb-4">You have no orders yet.</p>
        <button
          onClick={() => navigate("/")}
          className="brand-button px-6 py-2 rounded-2xl"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-transparent flex justify-center px-4">
      <div className="w-full max-w-[800px] p-4">
        {/* Header */}
        <div className="flex gap-[20px] items-center mb-6">
          <div onClick={() => navigate("/")} className="cursor-pointer">
            <MdKeyboardBackspace className="w-[25px] h-[25px] text-[#0f8b8d]" />
          </div>
          <h1 className="text-2xl font-bold">My Orders</h1>
        </div>

        <div className="space-y-6">
          {myOrders?.map((order) => (
            <div
              key={order?._id}
              className="bg-white rounded-2xl shadow p-4 space-y-4"
            >
              {/* Order Info */}
              <div className="flex justify-between border-b pb-2">
                <div>
                  <p className="font-semibold">
                    Order #{order?._id?.slice(-6)}
                  </p>
                  <p className="text-sm text-[#6b7f7f]">
                    Date: {formatDate(order?.createdAt)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-[#6b7f7f]">
                    Payment: {order?.paymentMethod?.toUpperCase()}
                  </p>
                  <p className="text-sm text-[#6b7f7f]">
                    Status:{" "}
                    <span className="font-medium text-blue-600">
                      {order?.shopOrders?.[0]?.status}
                    </span>
                  </p>
                </div>
              </div>

              {/* Shop-wise Orders */}
              {order?.shopOrders?.map((shopOrder, idx) => (
                <div
                  key={idx}
                  className="border rounded-2xl p-3 bg-[#fffaf7] space-y-3"
                >
                  {/* Shop Name */}
                  <p className="font-medium text-[#173a3a] text-lg">
                    {shopOrder?.shop?.name || "N/A"}
                  </p>

                  {/* Items */}
                  <div className="flex space-x-4 overflow-x-auto pb-2">
                    {shopOrder.items.map((item) => (
                      <div
                        key={item?._id}
                        className="flex-shrink-0 w-40 border rounded-2xl p-2 bg-white"
                      >
                        <img
                          src={item?.item?.image || "/placeholder.png"}
                          alt={item?.name}
                          className="w-full h-24 object-cover rounded"
                        />
                        <p className="text-sm font-semibold mt-1">
                          {item?.name}
                        </p>
                        <p className="text-xs text-[#6b7f7f]">
                          Qty: {item?.quantity} × ₹{item?.price}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Shop Subtotal */}
                  <div className="flex justify-between items-center border-t pt-2">
                    <p className="font-semibold">
                      Subtotal: ₹{shopOrder?.subtotal}
                    </p>
                    <span className="text-sm font-medium text-blue-600">
                      {shopOrder?.status}
                    </span>
                  </div>
                </div>
              ))}

              {/* Overall Order Total */}
              <div className="flex justify-between items-center border-t pt-2">
                <p className="font-semibold">Total: ₹{order?.totalAmount}</p>

                {order?.shopOrders?.[0]?.status === "delivered" ? (
                  <span className="text-green-600 font-semibold">
                    Delivered ✅
                  </span>
                ) : (
                  <button
                    onClick={() => navigate(`/track-order/${order._id}`)}
                    className="brand-button px-4 py-2 rounded-2xl text-sm"
                  >
                    Track Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
