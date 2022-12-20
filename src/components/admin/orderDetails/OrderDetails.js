import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import spinnerImg from "../../../assets/spinner.jpg";
import ChangeOrderStatus from "../changeOrderStatus/ChangeOrderStatus";

const OrderDetails = () => {
	const [order, setOrder] = useState(null);
	const { id } = useParams();

	const { document } = useFetchDocument("orders", id);

	useEffect(() => {
		setOrder(document);
	}, [document]);

	console.log(order);

	return (
		<section className="mt-[100px] my-10">
			<div>
				<h2 className="text-4xl font-bold text-center">Order Details</h2>
				<div className="text-xl font-semibold ml-10 mt-4">
					<NavLink to="/admin/orders">&larr; Back to orders</NavLink>
				</div>
				<br />
				{order === null ? (
					<div className="h-screen flex justify-center items-center">
						<img src={spinnerImg} alt="Loading ..." className="" />
					</div>
				) : (
					<>
						<div className="w-full  flex flex-col items-center my-8">
							<p className="text-xl w-[80%]  text-slate-500">
								<span className="mr-10 font-semibold">Order Id :</span>{" "}
								{order.id}
							</p>
							<p className="text-xl  w-[80%] text-slate-500">
								<span className="mr-10 font-semibold">Order Amount :</span>{" "}
								{order.orderAmount}
							</p>
							<p className="text-xl  w-[80%] text-slate-500">
								<span className="mr-10 font-semibold">Order Status :</span>{" "}
								{order.orderStatus}
							</p>
							<div className="text-xl  w-[80%] text-slate-500 uppercase">
								<p className="mr-10 font-semibold">Shipping Address :</p>
								<p>{order.shippingAddress.name}</p>
								<p>{order.shippingAddress.line1}</p>
								<p>{order.shippingAddress.city}</p>
								<p>{order.shippingAddress.state}</p>
								<p>India</p>
								<p>PIN CODE : {order.shippingAddress.postal_code}</p>
								<p>Contact : {order.shippingAddress.phone}</p>
							</div>
						</div>
						<div>
							<div>
								<div className="flex flex-col items-center">
									<div className="w-[80%]">
										<div className="grid grid-cols-5 mb-8 text-2xl font-semibold items-center border-4 border-slate-500 bg-slate-400 shadow-xl py-4 justify-items-center">
											<div>S/N</div>
											<div>Product</div>
											<div>Price</div>
											<div>Quantity</div>
											<div>Total</div>
										</div>
									</div>
									<div className="w-[80%]">
										<div>
											<div>
												{order.cartItems.map((item, index) => {
													const { id, name, imageURL, cartQuantity, price } =
														item;
													return (
														<div
															className="grid grid-cols-5 h-[150px] border border-slate-200 items-center justify-items-center shadow-lg mb-2 cursor-pointer"
															key={id}
														>
															<div className="font-bold">{index + 1}</div>
															<div className="font-bold flex flex-col justify-center items-center">
																<div>{name}</div>
																<div>
																	<img
																		src={imageURL}
																		alt=" not available"
																		className="w-[100px] h-[100px]"
																	/>
																</div>
															</div>

															<div className="font-bold">{`$${price.toFixed(
																2
															)}`}</div>
															<div className="font-bold">{cartQuantity}</div>
															<div className="font-bold">{`$${(
																price * cartQuantity
															).toFixed(2)}`}</div>
														</div>
													);
												})}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="flex justify-around">
							<ChangeOrderStatus order={order} id={id} />
						</div>
					</>
				)}
			</div>
		</section>
	);
};

export default OrderDetails;
