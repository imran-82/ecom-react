import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	FILTER_BY_BRAND,
	FILTER_BY_CATEGORY,
	FILTER_BY_PRICE,
} from "../../../redux/slice/filterSlice";
import {
	selectMaxPrice,
	selectMinPrice,
	selectProduct,
} from "../../../redux/slice/productSlice";

const ProductFilter = () => {
	// eslint-disable-next-line no-unused-vars
	const [category, setCategory] = useState("All");
	const [brand, setBrand] = useState("All");

	const products = useSelector(selectProduct);
	const maxPrice = useSelector(selectMaxPrice);
	const minPrice = useSelector(selectMinPrice);
	const [price, setPrice] = useState(3000);
	const dispatch = useDispatch();

	const allCategories = [
		"All",
		...new Set(products.map((product) => product.category)),
	];

	const allBrands = [
		"All",
		...new Set(products.map((product) => product.brand)),
	];

	useEffect(() => {
		dispatch(FILTER_BY_BRAND({ products, brand }));
	}, [dispatch, products, brand]);

	useEffect(() => {
		dispatch(FILTER_BY_PRICE({ products, price }));
	}, [dispatch, products, price]);

	const filterProducts = (cat) => {
		setCategory(cat);
		dispatch(FILTER_BY_CATEGORY({ products, category: cat }));
	};

	const clearFilters = () => {
		setCategory("All");
		setBrand("All");
		setPrice(maxPrice);
	};
	return (
		<div className="ml-2">
			<h4 className="text-2xl font-semibold bg-slate-200 mt-2 h-12 items-center pt-2 pl-1">
				Categories -
			</h4>

			<div className="flex flex-col gap-4 my-5 ml-2 text-lg font-medium">
				{allCategories.map((cat, index) => {
					return (
						<button
							key={index}
							type="button"
							onClick={() => filterProducts(cat)}
							className=" text-left pl-2 border-b-2 border-black focus:border-2 focus:border-orange-500 focus:shadow-lg focus:shadow-orange-400"
						>
							&#8250; {cat}
						</button>
					);
				})}
			</div>
			<h4 className="text-2xl font-semibold bg-slate-200 mt-14 h-12 pt-2 pl-1">
				Brand -
			</h4>
			<div>
				<select
					value={brand}
					onChange={(e) => setBrand(e.target.value)}
					className="w-full h-8 pl-2 text-lg font-medium focus:bg-orange-300 border-2 border-black mt-1 "
				>
					{allBrands.map((brand, index) => {
						return (
							<option value={brand} key={index} className="text-lg font-medium">
								{brand}
							</option>
						);
					})}
				</select>
			</div>
			<h4 className="text-2xl font-semibold bg-slate-200 mt-14 h-12 items-center pt-2 pl-1">
				Price -
			</h4>
			<p className="text-lg font-medium mt-4">{`$${price}`}</p>
			<div>
				<input
					type="range"
					value={price}
					min={minPrice}
					max={maxPrice}
					onChange={(e) => setPrice(e.target.value)}
					className="w-full"
				/>
			</div>
			<br />
			<button
				className="cursor-pointer border-2 text-lg font-medium border-orange-800 shadow-orange-300 shadow-md hover:shadow-lg hover:shadow-orange-500 hover:scale-105  bg-orange-500 w-fit px-7 py-1  rounded-md "
				onClick={clearFilters}
			>
				Clear Filters
			</button>
		</div>
	);
};

export default ProductFilter;
