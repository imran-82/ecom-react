import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import {
	SET_ACTIVE_USER,
	REMOVE_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import { ShowOnLogin, ShowOnLogout } from "../hiddenlink/hiddenLink";
import { AdminOnlyLink } from "../adminOnlyRoute/AdminOnlyRoute";
import {
	CALCULATE_TOTAL_QUANTITY,
	selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";

const Navbar1 = () => {
	const [open, setOpen] = useState(false);
	const [displayName, setDisplayName] = useState("");
	const [scrollPage, setScrollPage] = useState(true);
	const cartTotalQuantity = useSelector(selectCartTotalQuantity);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(CALCULATE_TOTAL_QUANTITY());
	}, []);

	const fixNavBar = () => {
		if (window.scrollY > 50) {
			setScrollPage(true);
		} else {
			setScrollPage(false);
		}
	};
	window.addEventListener("scroll", fixNavBar);

	const logoutUser = () => {
		signOut(auth)
			.then(() => {
				toast.success("successfully logged out");
				navigate("/");
			})
			.catch((error) => {
				toast.error(error.message);
			});
	};

	//Monitor currently signed in user
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				//console.log(user);
				if (user.displayName === null) {
					const u1 = user.email;
					const u2 = u1.split("@");
					const uName = u2[0].charAt(0).toUpperCase() + u2[0].slice(1);
					setDisplayName(uName);
				} else {
					setDisplayName(user.displayName);
				}

				dispatch(
					SET_ACTIVE_USER({
						email: user.email,
						userName: user.displayName ? user.displayName : displayName,
						userID: user.uid,
					})
				);
			} else {
				setDisplayName("");
				dispatch(REMOVE_ACTIVE_USER());
			}
		});
	}, [dispatch, displayName]);

	return (
		<div
			className={
				scrollPage ? "fixed z-10 top-0 shadow-md w-full " : "shadow-md w-full "
			}
		>
			<div className="md:flex items-center justify-between bg-slate-100 py-4 md:px-10 px-7">
				<div className="font-bold text-2xl flex cursor-pointer items-center text-gray-800">
					<span className="text-3xl text-indigo-600 mr-1 pt-2 ">
						<ion-icon name="logo-ionic"></ion-icon>
					</span>
					Designer
				</div>
				<div
					className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden "
					onClick={() => setOpen(!open)}
				>
					<ion-icon name={open ? "menu-outline" : "close-outline"}></ion-icon>
				</div>
				<ul
					className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-slate-100 md:z-0 z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in  ${
						open ? "top-[-490px]" : "top-16 opacity-100"
					}`}
				>
					{" "}
					<AdminOnlyLink>
						<li className="md:ml-8 text-xl md:my-0 my-7">
							<NavLink
								to="/admin/home"
								className="bg-blue-500 px-2 py-1 rounded-lg"
							>
								ADMIN
							</NavLink>
						</li>
					</AdminOnlyLink>
					<li className="md:ml-8 text-xl md:my-0 my-7">
						<NavLink
							to="/"
							className="text-gray-800 hover:text-gray-400 duration-500 cursor-pointer focus:underline focus:text-gray-400"
						>
							HOME
						</NavLink>
					</li>
					<ShowOnLogout>
						<li className="md:ml-8 text-xl md:my-0 my-7">
							<NavLink
								to="/login"
								className="text-gray-800 hover:text-gray-400 duration-500 cursor-pointer focus:underline focus:text-gray-400"
							>
								LOGIN
							</NavLink>
						</li>
					</ShowOnLogout>
					<ShowOnLogin>
						<li className="md:ml-8 text-xl md:my-0 my-7">
							<a
								href="#Home"
								className="uppercase flex justify-center items-center gap-2"
							>
								<FaUserCircle size={23} className="inline-block mt-1" /> HI ,{" "}
								{displayName}
							</a>
						</li>
					</ShowOnLogin>
					<ShowOnLogout>
						<li className="md:ml-8 text-xl md:my-0 my-7">
							<NavLink
								to="/register"
								className="text-gray-800 hover:text-gray-400 duration-500 cursor-pointer focus:underline focus:text-gray-400"
							>
								REGISTER
							</NavLink>
						</li>
					</ShowOnLogout>
					<ShowOnLogin>
						<li className="md:ml-8 text-xl md:my-0 my-7">
							<NavLink
								to="/order-history"
								className="text-gray-800 hover:text-gray-400 duration-500 cursor-pointer focus:underline focus:text-gray-400"
							>
								MY ORDERS
							</NavLink>
						</li>
					</ShowOnLogin>
					<li className="md:ml-8 text-xl md:my-0 my-7">
						<NavLink
							to="/contact"
							className="text-gray-800 hover:text-gray-400 duration-500 cursor-pointer focus:underline focus:text-gray-400"
						>
							CONTACT US
						</NavLink>
					</li>
					<ShowOnLogin>
						<li className="md:ml-8 text-xl md:my-0 my-7">
							<NavLink
								to="#"
								className="text-gray-800 hover:text-gray-400 duration-500 cursor-pointer focus:underline focus:text-gray-400"
								onClick={logoutUser}
							>
								LOGOUT
							</NavLink>
						</li>
					</ShowOnLogin>
					<li className="md:ml-8 text-xl md:my-0 my-7">
						<NavLink to="/cart" className="flex relative ">
							<FaShoppingCart className=" cursor-pointer text-xl text-gray-800 hover:text-gray-400 duration-500" />
							<span className="absolute h-6 w-6 text-lg p-2 bg-blue-400 rounded-full flex justify-center items-center top-[-0.60rem] left-[1.25rem] ">
								{cartTotalQuantity}
							</span>
						</NavLink>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Navbar1;
