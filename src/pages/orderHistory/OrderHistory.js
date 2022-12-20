import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { selectUserID } from "../../redux/slice/authSlice";
import { selectOrderHistory, STORE_ORDERS } from "../../redux/slice/orderSlice";

const OrderHistory = () => {
	const { data, isLoading } = useFetchCollection("orders");
	const orders = useSelector(selectOrderHistory);
	const userId = useSelector(selectUserID);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(STORE_ORDERS(data));
	}, [dispatch, data]);

	const handleClick = (id) => {
		navigate(`/order-details/${id}`);
	};

	const filteredOrders = orders.filter((order) => order.userId === userId);

	return (
		<section className="mb-10">
			<div>
				<h2 className="text-4xl font-bold text-center my-8">
					Your Order History
				</h2>
				<p className="text-xl font-normal text-center">
					Open an order to leave a{" "}
					<span className="font-bold">Product Review</span>
				</p>
				<br />
				<div className="flex flex-col items-center">
					<div className="w-[80%]">
						<div className="grid grid-cols-5 mb-8 text-2xl font-semibold items-center border-4 border-slate-500 bg-slate-400 shadow-xl py-4 justify-items-center">
							<div>S/N</div>
							<div>Date</div>
							<div>Order Id</div>
							<div>Order Amount</div>
							<div>Order Status</div>
						</div>
					</div>
					<div className="w-[80%]">
						{isLoading && Loader}
						<div>
							{filteredOrders.length === 0 ? (
								<p>No order Found</p>
							) : (
								<div>
									{filteredOrders.map((order, index) => {
										const {
											id,
											orderDate,
											orderTime,
											orderAmount,
											orderStatus,
										} = order;
										return (
											<div
												className="grid grid-cols-5 h-[70px] border border-slate-200 items-center justify-items-center shadow-lg mb-2 cursor-pointer"
												key={id}
												onClick={() => handleClick(id)}
											>
												<div className="font-bold">{index + 1}</div>
												<div className="font-bold">{`${orderDate} at 
												 ${orderTime}`}</div>
												<div className="font-bold">{id}</div>
												<div className="font-bold">{`$${orderAmount}`}</div>
												<div className="font-bold text-orange-500">
													{orderStatus}
												</div>
											</div>
										);
									})}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default OrderHistory;
