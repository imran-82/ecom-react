import React from "react";
import { NavLink } from "react-router-dom";

const CheckoutSuccess = () => {
	return (
		<section className="w-full my-16 ">
			<div className=" flex flex-col justify-center items-center w-full">
				<h2 className="text-3xl font-bold h-[40px]  px-2 text-green-600 shadow-lg shadow-green-500 w-fit text-center">
					Checkout Successfull
				</h2>
				<p className="text-3xl font-bold h-[40px]  px-2 mt-6 text-green-600 shadow-lg shadow-green-500 w-fit text-center">
					Thank you for your purchase
				</p>
				<br />

				<button className="bg-blue-500 px-4 py-2 text-lg font-semibold rounded-md hover:bg-blue-700 hover:scale-110 shadow-lg shadow-blue-300">
					<NavLink to="/order-history">View order status</NavLink>
				</button>
			</div>
		</section>
	);
};

export default CheckoutSuccess;
