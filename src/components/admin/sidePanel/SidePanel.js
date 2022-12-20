import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectUserName } from "../../../redux/slice/authSlice";

const SidePanel = () => {
	const userName = useSelector(selectUserName);
	return (
		<div className="border-r-2 border-solid border-cyan-800 h-[1450px]">
			<div className="h-60 bg-blue-500 flex justify-center items-center flex-col gap-2 text-xl font-semibold uppercase ring-4 ring-blue-800 mb-2">
				<FaUserCircle size={40} className="text-white" />
				hi , {userName}
			</div>
			<nav>
				<ul>
					<li className="w-full h-14 border-b-2 border-cyan-700 flex items-center focus:border-r-4 focus-within:ring focus-within:ring-red-600/60 ">
						<NavLink
							to="/admin/home"
							className="text-xl font-semibold pl-2 focus:text-red-700 hover:scale-110 focus:scale-110  "
						>
							Home
						</NavLink>
					</li>
					<li className="w-full h-14 border-b-2 border-cyan-700 flex items-center focus:border-r-4 focus-within:ring focus-within:ring-red-600/60 ">
						<NavLink
							to="/admin/all-products"
							className="text-xl font-semibold pl-2 focus:text-red-700 hover:scale-110 focus:scale-110  "
						>
							View Products
						</NavLink>
					</li>
					<li className="w-full h-14 border-b-2 border-cyan-700 flex items-center focus:border-r-4 focus-within:ring focus-within:ring-red-600/60 ">
						<NavLink
							to="/admin/add-product/ADD"
							className="text-xl font-semibold pl-2 focus:text-red-700 hover:scale-110 focus:scale-110  "
						>
							Add Products
						</NavLink>
					</li>
					<li className="w-full h-14 border-b-2 border-cyan-700 flex items-center focus:border-r-4 focus-within:ring focus-within:ring-red-600/60 ">
						<NavLink
							to="/admin/orders"
							className="text-xl font-semibold pl-2 focus:text-red-700 hover:scale-110 focus:scale-110  "
						>
							View Orders
						</NavLink>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default SidePanel;
