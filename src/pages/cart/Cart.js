import React from "react";
import { useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";
import {
	ADD_TO_CART,
	CALCULATE_SUBTOTAL,
	CALCULATE_TOTAL_QUANTITY,
	CLEAR_CART,
	DECREASE_CART,
	DELETE_FROM_CART,
	SAVE_URL,
	selectCartItems,
	selectCartTotalAmount,
	selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";

const Cart = () => {
	const cartItems = useSelector(selectCartItems);
	const cartTotalAmount = useSelector(selectCartTotalAmount);
	const cartTotalQuantity = useSelector(selectCartTotalQuantity);
	const isLoggedIn = useSelector(selectIsLoggedIn);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const increaseCart = (item) => {
		dispatch(ADD_TO_CART(item));
	};

	const decreaseCart = (item) => {
		dispatch(DECREASE_CART(item));
	};

	const deleteItem = (item) => {
		dispatch(DELETE_FROM_CART(item));
	};

	const clearCart = () => {
		dispatch(CLEAR_CART());
	};

	useEffect(() => {
		dispatch(CALCULATE_SUBTOTAL());
		dispatch(CALCULATE_TOTAL_QUANTITY());
		dispatch(SAVE_URL(""));
	}, [dispatch, cartItems]);

	const url = window.location.href;

	const checkOut = () => {
		if (isLoggedIn) {
			navigate("/checkout-details");
		} else {
			dispatch(SAVE_URL(url));
			navigate("/login");
		}
	};

	if (cartItems.length === 0) {
		return (
			<>
				<h2 className="text-5xl font-semibold text-black pt-8 text-center">
					Shopping Cart
				</h2>
				<div className="w-screen h-[500px] flex flex-col justify-center items-center mt-[-50px]">
					<p className="text-3xl font-bold text-red-500">
						Your cart is currently empty
					</p>
					<br />
					<div className="text-2xl font-semibold hover:scale-110 hover:text-blue-500">
						<NavLink to="/#products">&larr; Continue Shopping</NavLink>
					</div>
				</div>
			</>
		);
	} else {
		return (
			<section>
				<div className=" flex justify-center items-center flex-col mb-8">
					<h2 className="text-5xl font-semibold text-black py-8">
						Shopping Cart
					</h2>
					<div className=" w-[80%] h-full">
						<div className="grid grid-cols-6 mb-8 text-2xl font-semibold items-center border-4 border-slate-500 bg-slate-400 shadow-xl py-4 justify-items-center">
							<div>S/N</div>
							<div>Product</div>
							<div>Price</div>
							<div>Quantity</div>
							<div>Total</div>
							<div>Actions</div>
						</div>
					</div>
					<div className="w-[80%]">
						{cartItems.map((item, index) => {
							const { id, name, imageURL, price, cartQuantity } = item;
							return (
								<div
									className="grid grid-cols-6 h-[150px] border border-slate-200 items-center justify-items-center shadow-lg mb-2"
									key={id}
								>
									<div className="font-bold">{index + 1}</div>
									<div className="flex flex-col-reverse justify-center items-center">
										<div>
											<img
												src={imageURL}
												alt={name}
												className="w-[100px] h-[100px]"
											/>
										</div>
										<div className="font-semibold">{name}</div>
									</div>

									<div className="font-semibold">{`$${price}`}</div>
									<div className="flex flex-row ">
										<button
											className="bg-gray-400 w-8 h-8 hover:bg-gray-600 "
											onClick={() => decreaseCart(item)}
										>
											<span className="font-extrabold w-full h-full text-xl">
												-
											</span>
										</button>
										<p className="font-semibold  w-8 h-8 flex justify-center items-center">
											{cartQuantity}
										</p>
										<button
											className="bg-gray-400 w-8 h-8 hover:bg-gray-600 "
											onClick={() => increaseCart(item)}
										>
											<span className="font-extrabold w-full h-full text-xl">
												+
											</span>
										</button>
									</div>
									<div className="font-semibold">{`$ ${(
										price * cartQuantity
									).toFixed(2)}`}</div>
									<div className="flex gap-2">
										<FaTrashAlt
											size={18}
											className="text-red-600 cursor-pointer hover:scale-110"
											onClick={() => deleteItem(item)}
										/>
									</div>
								</div>
							);
						})}
					</div>
					<div className="flex justify-between w-[80%]">
						<button
							className="cursor-pointer border-2 border-orange-800 shadow-orange-300 shadow-md hover:shadow-lg text-white hover:shadow-orange-500 hover:scale-105  bg-orange-500 w-fit px-7 py-1 h-10 rounded-md  font-semibold"
							onClick={clearCart}
						>
							Clear Cart
						</button>
						<div className="flex flex-col gap-4">
							<div className="font-semibold text-xl text-slate-400  mt-2 hover:text-slate-600">
								<NavLink to="/#products">&larr; Continue Shopping</NavLink>
							</div>
							<div className=" p-4 shadow-2xl shadow-slate-400 border border-slate-200">
								<p className="text-slate-500">
									Cart Items(s): <span>{cartTotalQuantity}</span>
								</p>
								<div className="w-full flex justify-between mt-2 mb-4 font-semibold ">
									<h4 className="text-2xl">Subtotal:</h4>
									<h3 className="text-xl">{`$ ${cartTotalAmount.toFixed(
										2
									)}`}</h3>
								</div>
								<p className="text-slate-500 font-sans">
									Taxes and shipping calculated at checkout
								</p>
								<button
									className="w-full bg-blue-500 h-10 rounded-md font-semibold text-xl text-white hover:bg-blue-700 mt-2"
									onClick={checkOut}
								>
									Checkout
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
};

export default Cart;
