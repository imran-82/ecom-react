import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import spinnerImg from "../../../assets/spinner.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
	ADD_TO_CART,
	CALCULATE_TOTAL_QUANTITY,
	DECREASE_CART,
	selectCartItems,
} from "../../../redux/slice/cartSlice";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import StarsRating from "react-star-rate";

const ProductDetails = () => {
	const { id } = useParams();
	const [product, setProduct] = useState(null);

	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);

	const cart = cartItems.find((item) => item.id === id);

	const { document } = useFetchDocument("products", id);
	const { data } = useFetchCollection("reviews");
	const filteredReviews = data.filter((item) => item.productID === id);

	const isProductAdded = cartItems.findIndex((item) => {
		return item.id === id;
	});

	useEffect(() => {
		setProduct(document);
	}, [document]);

	const addToCart = (product) => {
		dispatch(ADD_TO_CART(product));
		dispatch(CALCULATE_TOTAL_QUANTITY());
	};

	const decreaseCart = (product) => {
		dispatch(DECREASE_CART(product));
		dispatch(CALCULATE_TOTAL_QUANTITY());
	};
	return (
		<section>
			<div className="mb-16">
				<h2 className="text-5xl my-5 bg-gray-400 text-center">
					Product Details
				</h2>
				<div className="font-semibold text-lg my-5">
					<NavLink to="/#products">&larr; Back To Products</NavLink>
				</div>
				{product === null ? (
					<div className="w-full flex justify-center items-center">
						<img src={spinnerImg} alt="Loading ..." />
					</div>
				) : (
					<>
						<div className="grid grid-cols-2 gap-4">
							<div className="flex justify-center">
								<img
									src={product.imageURL}
									alt={product.name}
									className="h-[500px]"
								/>
							</div>
							<div className="flex flex-col gap-4 w-[70%]">
								<h3 className="font-semibold text-3xl">{product.name}</h3>
								<p className="font-semibold text-xl">{`$${product.price}`}</p>
								<p className="text-xl">{product.desc}</p>
								<p className="text-xl">
									<span className="font-semibold mr-5">SKU:</span> {product.id}
								</p>
								<p className="text-xl">
									<span className="font-semibold mr-5">BRAND:</span>{" "}
									{product.brand}
								</p>
								{isProductAdded > -1 && (
									<div className="flex flex-row h-10 w-[20%] rounded-lg  bg-transparent mt-1">
										<button
											className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer
									 outline-none "
											onClick={() => decreaseCart(product)}
										>
											<span className="m-auto text-2xl font-extrabold">-</span>
										</button>
										<input
											type="text"
											className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700"
											name="custom-input-number"
											value={cart === undefined ? 0 : cart.cartQuantity}
										></input>
										{/* <p>{cart === undefined ? 0 : cart.cartQuantity}</p> */}

										<button
											className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
											onClick={() => addToCart(product)}
										>
											<span className="m-auto text-2xl font-extrabold">+</span>
										</button>
									</div>
								)}
								<button
									className="cursor-pointer border-2 border-orange-800 shadow-orange-300 shadow-md hover:shadow-lg
								 hover:shadow-orange-500 hover:scale-105  bg-orange-500 w-fit px-7 py-1  rounded-md  font-semibold"
									onClick={() => addToCart(product)}
								>
									{" "}
									Add to cart
								</button>
							</div>
						</div>
					</>
				)}
				{product === null ? (
					<div></div>
				) : (
					<div className="grid grid-cols-2 gap-4">
						<div></div>
						<div className="">
							<h3 className="text-xl font-semibold">Product Review</h3>
							<div className=" w-[50%] ">
								{filteredReviews.length === 0 ? (
									<p>There are no reviews for this product yet.</p>
								) : (
									<>
										{filteredReviews.map((item, index) => {
											const { rate, review, reviewDate, userName } = item;
											return (
												<div
													className="mt-4 shadow-lg shadow-slate-400 px-2 pb-2 rounded-md"
													key={index}
												>
													<StarsRating value={rate} />
													<p className="font-medium">{review}</p>
													<span className="text-sm font-medium">
														{reviewDate}
													</span>
													<span className="ml-2 text-sm font-medium">
														by : {userName}
													</span>
												</div>
											);
										})}
									</>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</section>
	);
};

export default ProductDetails;
