import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
	selectCartItems,
	selectCartTotalAmount,
	selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";

const CheckoutSummary = () => {
	const cartItems = useSelector(selectCartItems);
	const cartTotalAmount = useSelector(selectCartTotalAmount);
	const cartTotalQuantity = useSelector(selectCartTotalQuantity);
	return (
		<div className=" w-[50%]  p-4 shadow-lg border border-slate-300 shadow-slate-400">
			<h2 className="text-3xl font-semibold mt-6 mb-6 text-center">
				Checkout Summary
			</h2>
			<div>
				{cartItems.length === 0 ? (
					<>
						<p>No item in your cart</p>
						<button>
							<NavLink to="/#products">Go shopping</NavLink>
						</button>
					</>
				) : (
					<div>
						<p className="text-base text-slate-500 font-medium mt-4 mb-2">{`Cart item(s) : ${cartTotalQuantity}`}</p>
						<div className="flex justify-between mb-5">
							<h4 className="text-2xl font-medium "> Subtotal : </h4>
							<h3 className="text-xl font-medium">{`$${cartTotalAmount.toFixed(
								2
							)}`}</h3>
						</div>
						{cartItems.map((item, index) => {
							const { name, price, cartQuantity } = item;
							return (
								<div
									className=" mt-4 py-2 px-4 rounded-md  border border-slate-400 shadow-md shadow-slate-400"
									key={index}
								>
									<h4 className="text-xl font-semibold">{`Product : ${name}`}</h4>
									<p className="text-base font-medium text-slate-500">{`Quantity : ${cartQuantity}`}</p>
									<p className="text-base font-medium text-slate-500">{`Unit price : $${price.toFixed(
										2
									)}`}</p>
									<p className="text-base font-medium text-slate-500">{`Total price : $${(
										price * cartQuantity
									).toFixed(2)}`}</p>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};

export default CheckoutSummary;
