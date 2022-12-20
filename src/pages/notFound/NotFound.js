import React from "react";
import { NavLink } from "react-router-dom";

const NotFound = () => {
	return (
		<div className=" h-screen w-screen flex flex-col justify-center items-center gap-4">
			<h2 className="text-9xl font-bold text-red-600">404</h2>
			<p className="text-3xl font-semibold text-blue-500">
				Oooppppsssss.... page not found
			</p>
			<NavLink
				to="/"
				className="text-4xl mt-16 cursor-pointer text-blue-500 hover:scale-110 hover:text-blue-800"
			>
				&larr; Back to Home
			</NavLink>
		</div>
	);
};

export default NotFound;
