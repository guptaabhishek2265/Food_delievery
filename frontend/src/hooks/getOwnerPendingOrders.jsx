import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOwnerPendingOrders, updateOwnerOrderStatus } from "../redux/userSlice";
import { serverUrl } from "../App";

function useOwnerPendingOrders() {
  const dispatch = useDispatch();
  const { userData, socket } = useSelector((state) => state.user);

  useEffect(() => {
    if (userData?.role === "owner") {
      // initial fetch
      const fetchOrders = async () => {
        const result = await axios.get(`${serverUrl}/api/order/shop-orders`, {
          withCredentials: true,
        });
        dispatch(setOwnerPendingOrders(result.data.orders));
    
      };
      fetchOrders();

      // realtime socket listener
      const handleNewOrder = (data) => {
        if (data.ownerId === userData._id) {
          dispatch(setOwnerPendingOrders(data.order));
         
        }
      };

      const handleStatusUpdated = (data) => {
        const shopOrderOwner = data.shopOrder?.owner?._id || data.shopOrder?.owner;
        if (String(shopOrderOwner) !== String(userData._id)) return;

        dispatch(updateOwnerOrderStatus({
          orderId: data.orderId,
          shopOrder: data.shopOrder,
        }));
      };

      socket?.on("orders:new", handleNewOrder);
      socket?.on("orders:statusUpdated", handleStatusUpdated);

      return () => {
        socket?.off("orders:new", handleNewOrder);
        socket?.off("orders:statusUpdated", handleStatusUpdated);
      };
    }
  }, [userData, socket, dispatch]);
}

export default useOwnerPendingOrders;
