import { doc, setDoc, Timestamp } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { db } from "../../../firebase/config";
import Loader from "../../loader/Loader";

const ChangeOrderStatus = ({ order, id }) => {
	const [status, setStatus] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const editOrderStatus = (e, id) => {
		e.preventDefault();
		setIsLoading(true);
		const orderConfig = {
			userId: order.userId,
			userEmail: order.userEmail,
			orderDate: order.orderDate,
			orderTime: order.orderTime,
			orderAmount: order.orderAmount,
			orderStatus: status,
			cartItems: order.cartItems,
			shippingAddress: order.shippingAddress,
			createdAt: order.createdAt,
			updatedAt: Timestamp.now().toDate(),
		};
		try {
			setDoc(doc(db, "orders", id), orderConfig);
			setIsLoading(false);
			toast.success("Order status changed successfully");

			navigate("/admin/orders");
		} catch (error) {
			setIsLoading(false);
			toast.error(error.message);
		}
	};

	return (
		<>
			{isLoading && <Loader />}
			<div className="w-[600px] h-[200px] border border-slate-400 mt-12 shadow-lg shadow-slate-500 px-4 rounded-lg pt-2">
				<h4 className="text-xl font-semibold text-center mb-8">
					Update Order Status
				</h4>
				<form
					onSubmit={(e) => editOrderStatus(e, id)}
					className="flex flex-col gap-4"
				>
					<span>
						<select
							value={status}
							onChange={(e) => setStatus(e.target.value)}
							className="form-control block w-full px-4 py-2 text-xl font-semibold text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
						>
							<option value="" disabled>
								<span className="text-lg font-semibold">-- Select One --</span>
							</option>
							<option className="text-lg font-semibold" value="Order Placed">
								Order Placed
							</option>
							<option className="text-lg font-semibold" value="Processing">
								Processing
							</option>
							<option className="text-lg font-semibold" value="Shipped">
								Shipped
							</option>
							<option className="text-lg font-semibold" value="Delivered">
								Delivered
							</option>
						</select>
					</span>
					<span className="flex justify-center">
						<button
							type="submit"
							className="inline-block px-7 py-3 bg-blue-600 text-white font-medium  leading-snug uppercase rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-[40%]"
						>
							Update Status
						</button>
					</span>
				</form>
			</div>
		</>
	);
};

export default ChangeOrderStatus;
