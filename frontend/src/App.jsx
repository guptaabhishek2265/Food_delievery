import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import getCurrentUser from "./hooks/getCurrentUser";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import getCity from "./hooks/getCity";
import getAllShops from "./hooks/getAllShops";
import EditShop from "./pages/EditShop";
import { setShop, setSocket } from "./redux/userSlice";
import getCurrentShop from "./hooks/getCurrentShop";
import AddItem from "./pages/AddItem";
import EditItem from "./pages/EditItem";
import getShopsByCity from "./hooks/getShopsByCity";
import getItemsByCity from "./hooks/getItemsByCity";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderPlaced from "./pages/OrderPlaced";
import MyOrders from "./pages/MyOrders";
import getOwnerPendingOrders from "./hooks/getOwnerPendingOrders";
import PendingOrders from "./pages/PendingOrders";
import { io } from "socket.io-client";
import updateLocation from "./hooks/updateLocation";
import TrackOrderPage from "./pages/TrackOrderPage";
import MyDeliveredOrders from "./pages/MyDeliveredOrders";
import ShopItems from "./pages/ShopItems";

export const serverUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

function App() {
  const { userData, allShops, socket } = useSelector((state) => state.user);
  const [deliveryOtpNotice, setDeliveryOtpNotice] = useState(null);

  getCurrentUser();
  getCity();
  getCurrentShop();
  getShopsByCity();
  getItemsByCity();
  getOwnerPendingOrders();
  updateLocation();

  const dispatch = useDispatch();
  useEffect(() => {
    const socketInstance = io(serverUrl, { 
      withCredentials: true,
      transports: ['websocket', 'polling'] // Add fallback transports
    });
    dispatch(setSocket(socketInstance));

    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id);
      if (userData?._id) {
        socketInstance.emit("identify", { userId: userData._id });
      }
    });

    socketInstance.on("delivery:otpSent", (data) => {
      setDeliveryOtpNotice(data);
      alert(`Your delivery OTP is ${data.otp}`);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [userData?._id, userData?.role]);

  return (
    <>
      {userData?.role === "user" && deliveryOtpNotice && (
        <div className="fixed top-4 left-1/2 z-50 w-[92%] max-w-[420px] -translate-x-1/2 rounded-lg border border-[#bfe3df] bg-white p-4 shadow-lg">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#173a3a]">
                Delivery OTP
              </p>
              <p className="mt-1 text-2xl font-bold tracking-widest text-[#0f8b8d]">
                {deliveryOtpNotice.otp}
              </p>
              <p className="mt-1 text-xs text-[#6b7f7f]">
                Share this OTP with the delivery boy to complete delivery.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setDeliveryOtpNotice(null)}
              className="rounded-md px-2 py-1 text-sm font-semibold text-[#6b7f7f] hover:bg-gray-100"
              aria-label="Close delivery OTP"
            >
              X
            </button>
          </div>
        </div>
      )}

      <Routes>
      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to={"/"} />}
      />
      <Route
        path="/signin"
        element={!userData ? <SignIn /> : <Navigate to={"/"} />}
      />
      <Route
        path="/forgot-password"
        element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />}
      />
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/editshop"
        element={userData ? <EditShop /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/additem"
        element={userData ? <AddItem /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/edititem/:itemId"
        element={userData ? <EditItem /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/cart"
        element={userData ? <CartPage /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/checkout"
        element={userData ? <CheckoutPage /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/order-placed"
        element={userData ? <OrderPlaced /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/my-orders"
        element={userData ? <MyOrders /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/pending-orders"
        element={userData ? <PendingOrders /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/my-delivered-orders"
        element={userData ? <MyDeliveredOrders /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/track-order/:orderId"
        element={userData ? <TrackOrderPage /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/shop-items/:shopId"
        element={userData ? <ShopItems /> : <Navigate to={"/signin"} />}
      />
      </Routes>
    </>
  );
}

export default App;
