import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
	ADD_TO_CART,
	CALCULATE_TOTAL_QUANTITY,
} from "../../../redux/slice/cartSlice";

const ProductItem = ({
	product,
	grid,
	id,
	name,
	price,
	imageURL,
	category,
	desc,
}) => {
	const shortenText = (text, n) => {
		if (text.length > n) {
			const shortText = text.substring(0, n).concat("...");
			return shortText;
		}
		return text;
	};
	const dispatch = useDispatch();

	const addToCart = (product) => {
		dispatch(ADD_TO_CART(product));
		dispatch(CALCULATE_TOTAL_QUANTITY());
	};

	if (grid === true) {
		return (
			<div className="w-full h-full flex flex-col p-4">
				<NavLink to={`/product-details/${id}`}>
					<div className="">
						<img src={imageURL} alt={name} className="w-full h-[350px]" />
					</div>
				</NavLink>
				<div>
					<div className="flex flex-col justify-center items-center">
						<p className="font-semibold  ">{`$${price}`}</p>
						<h4 className="font-semibold ">{shortenText(name, 15)}</h4>
						<button
							className="cursor-pointer border-2 border-orange-800 shadow-orange-300 shadow-md hover:shadow-lg hover:shadow-orange-500 hover:scale-105  bg-orange-500 w-fit px-7 py-1  rounded-md  font-semibold"
							onClick={() => addToCart(product)}
						>
							{" "}
							Add to cart
						</button>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className=" grid grid-cols-2 h-[250px] w-[70%] border-2 border-gray-300 shadow-lg">
				<figure className="grid justify-center items-center">
					<img src={imageURL} alt={name} className="h-[200px]" />
				</figure>

				<div className="card-data  flex flex-col justify-center">
					<h3 className="text-2xl capitalize mb-4">{name}</h3>
					<p className="mb-2">{`$${price}`}</p>
					<p className="mr-20 mb-9">{shortenText(desc, 120)}</p>

					<NavLink to={`/product-details/${id}`}>
						<button className="cursor-pointer border-2 border-orange-800 shadow-orange-300 shadow-md hover:shadow-lg hover:shadow-orange-500 hover:scale-105  bg-orange-500 w-fit px-7 py-1  rounded-md  font-semibold">
							Read More
						</button>
					</NavLink>
				</div>
			</div>
		);
	}
};

export default ProductItem;
