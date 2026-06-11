import React, { useEffect, useState } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { IoIosSearch } from "react-icons/io";
import { LuShoppingCart } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { serverUrl } from '../App';
import axios from 'axios';
import { setSearchItems, setShop, setUserData } from '../redux/userSlice';
import { FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { TbReceipt2 } from "react-icons/tb";

function Nav() {
    const { city, userData, cartItems,pendingOrdersCount } = useSelector(state => state.user);
    const [showSearch, setShowSearch] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [input, setInput] = useState("");

    const handleLogOut = async () => {
        try {
            await axios.get(`${serverUrl}/api/auth/signout`, { withCredentials: true });
            dispatch(setUserData(null));
            dispatch(setShop(null));
            navigate("/signin");
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearchItems = async () => {
        try {
            const result = await axios.get(
                `${serverUrl}/api/user/search-items?city=${city}&query=${input}`,
                { withCredentials: true }
            );
            dispatch(setSearchItems(result.data));
        } catch (error) {
            dispatch(setSearchItems(null));
            console.log(error);
        }
    };

    useEffect(() => {
        if (input) {
            handleSearchItems();
        } else {
            dispatch(setSearchItems(null));
        }
    }, [input]);

    return (
        <div className="w-full h-[82px] flex items-center justify-between md:justify-center gap-[30px] px-[20px] fixed top-0 z-[9999] overflow-visible border-b border-[#d5ece9] bg-white/85 shadow-sm backdrop-blur-xl">

            {/* Mobile Search Box */}
            {showSearch && userData?.role === "user" && (
                <div className="w-[90%] h-[70px] brand-panel rounded-3xl items-center gap-[20px] z-[9999] flex fixed left-[5%] top-[90px]">
                    <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r border-[#d5ece9]">
                        <FaLocationDot className="w-[25px] h-[25px] text-[#0f8b8d]" />
                        <div className="w-[80%] truncate text-[#5f7474]">
                            {city || "searching.."}
                        </div>
                    </div>
                    <div className="w-[80%] flex items-center gap-[10px]">
                        <IoIosSearch className="w-[25px] h-[25px] text-[#0f8b8d]" />
                        <input
                            type="text"
                            placeholder="search delicious food..."
                            className="px-[10px] text-gray-700 outline-0 w-full"
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                        />
                    </div>
                </div>
            )}

            {/* Logo */}
            <h1 className="rounded-full bg-[#0f8b8d] px-5 py-2 text-2xl font-black tracking-wide text-white shadow-lg shadow-teal-900/10">
                Bingo
            </h1>

            {/* Desktop Search Box */}
            {userData?.role === "user" && (
                <div className="md:w-[60%] lg:w-[40%] h-[62px] brand-panel rounded-full items-center gap-[20px] hidden md:flex px-2">
                    <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r border-[#d5ece9]">
                        <FaLocationDot className="w-[25px] h-[25px] text-[#0f8b8d]" />
                        <div className="w-[80%] truncate text-[#5f7474]">
                            {city || "searching.."}
                        </div>
                    </div>
                    <div className="w-[80%] flex items-center gap-[10px]">
                        <IoIosSearch className="w-[25px] h-[25px] text-[#0f8b8d]" />
                        <input
                            type="text"
                            placeholder="search delicious food..."
                            className="px-[10px] text-gray-700 outline-0 w-full"
                             onChange={(e) => setInput(e.target.value)}
                            value={input}
                        />
                    </div>
                </div>
            )}

            {/* Right Side Icons */}
            <div className="flex items-center gap-[20px]">
                {/* Mobile search toggle */}
                {userData?.role === "user" && (
                    !showSearch ? (
                        <IoIosSearch className="w-[25px] h-[25px] text-[#0f8b8d] md:hidden" onClick={() => setShowSearch(true)} />
                    ) : (
                        <RxCross2 className="w-[25px] h-[25px] text-[#0f8b8d] md:hidden" onClick={() => setShowSearch(false)} />
                    )
                )}

                {/* Role Based UI */}
                {userData?.role === "owner" ? (
                    <>
                        {/* Add Food Item */}
                        <button
                            onClick={() => navigate("/additem")}
                            className="hidden md:flex items-center gap-1 px-4 py-2 cursor-pointer rounded-full bg-[#0f8b8d]/10 text-[#0f8b8d] hover:bg-[#0f8b8d] hover:text-white transition"
                        >
                            <FiPlus size={16} />
                            <span className="text-sm font-medium">Add Food Item</span>
                        </button>
                        <button
                            onClick={() => navigate("/additem")}
                            className="flex md:hidden items-center justify-center p-2 cursor-pointer rounded-full bg-[#0f8b8d]/10 text-[#0f8b8d]"
                        >
                            <FiPlus size={18} />
                        </button>

                        {/* Pending Orders */}
                        <div
                            className="hidden md:flex items-center gap-2 cursor-pointer relative px-4 py-2 rounded-full bg-[#0f8b8d]/10 text-[#0f8b8d] font-medium hover:bg-[#0f8b8d] hover:text-white transition"
                            onClick={() => navigate("/pending-orders")}
                        >
                            <TbReceipt2 className="w-[22px] h-[22px]" />
                            <span className="text-sm">My Orders</span>
                            <span className="absolute -right-2 -top-2 text-xs font-bold text-white bg-[#0f8b8d] rounded-full px-[6px] py-[1px]">
                                {pendingOrdersCount}
                            </span>
                        </div>
                        <div
                            className="flex md:hidden items-center justify-center relative p-2 rounded-full bg-[#0f8b8d]/10 text-[#0f8b8d]"
                            onClick={() => navigate("/pending-orders")}
                        >
                            <TbReceipt2 className="w-[22px] h-[22px]" />
                            <span className="absolute -right-1 -top-1 text-[10px] font-bold text-white bg-[#0f8b8d] rounded-full px-[4px] py-[0px]">
                              {pendingOrdersCount}
                            </span>
                        </div>
                    </>
                ) : userData?.role === "deliveryBoy" ? (
                    <button
                        onClick={() => navigate("/my-delivered-orders")}
                        className="px-4 py-2 rounded-full bg-[#0f8b8d]/10 text-[#0f8b8d] text-sm font-medium hover:bg-[#0f8b8d] hover:text-white transition"
                    >
                        My Orders
                    </button>
                ) : (
                    <>
                        {/* User Cart */}
                        <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
                            <LuShoppingCart className="w-[25px] h-[25px] text-[#0f8b8d]" />
                            <span className="absolute right-[-9px] top-[-12px] text-[#0f8b8d]">
                                {cartItems?.length}
                            </span>
                        </div>

                        {/* User Orders → only desktop */}
                        {userData?.role === "user" && (
                            <button
                                onClick={() => navigate("/my-orders")}
                                className="hidden md:block px-4 py-2 rounded-full bg-[#0f8b8d]/10 text-[#0f8b8d] text-sm font-medium hover:bg-[#0f8b8d] hover:text-white transition"
                            >
                                My Orders
                            </button>
                        )}
                    </>
                )}

                {/* Profile icon + Popup */}
                <div className="relative overflow-visible">
                    <div
                        className="w-[42px] h-[42px] rounded-full flex items-center justify-center bg-[#ff7a59] text-white text-[18px] shadow-xl shadow-orange-900/10 font-semibold cursor-pointer ring-4 ring-white"
                        onClick={() => setShowInfo(prev => !prev)}
                    >
                        {userData?.fullName?.slice(0, 1)}
                    </div>

                    {showInfo && (
                        <div className="fixed top-[86px] right-[10px] md:right-[10%] lg:right-[25%] w-[190px] brand-panel rounded-3xl p-[20px] flex flex-col gap-[10px] z-[9999]">
                            <div className="text-[17px] font-semibold">{userData?.fullName}</div>

                            {/* Mobile: My Orders */}
                            {userData?.role === "user" && (
                                <div
                                    className="md:hidden text-[#0f8b8d] font-semibold cursor-pointer"
                                    onClick={() => {
                                        setShowInfo(false);
                                        navigate("/my-orders");
                                    }}
                                >
                                    My Orders
                                </div>
                            )}

                            <div
                                className="text-[#0f8b8d] font-semibold cursor-pointer"
                                onClick={handleLogOut}
                            >
                                Log Out
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Nav;
