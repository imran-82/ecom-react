import React, { useState } from "react";
import { useEffect } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
	FILTER_BY_SEARCH,
	selectFilteredProducts,
	SORT_PRODUCTS,
} from "../../../redux/slice/filterSlice";
import Pagination from "../../pagination/Pagination";
import Search from "../../search/Search";
import ProductItem from "../productItem/ProductItem";

const ProductList = ({ products }) => {
	const [grid, setGrid] = useState(true);
	const [search, setSearch] = useState("");
	const [sort, setSort] = useState("latest");
	const dispatch = useDispatch();

	const filteredProducts = useSelector(selectFilteredProducts);
	//pagination states
	const [currentPage, setCurrentPage] = useState(1);
	// eslint-disable-next-line no-unused-vars
	const [productsPerPage] = useState(6);
	//get current product
	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

	const currentProducts = filteredProducts.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	);

	useEffect(() => {
		dispatch(SORT_PRODUCTS({ products, sort }));
	}, [dispatch, products, sort]);

	useEffect(() => {
		dispatch(FILTER_BY_SEARCH({ products, search }));
	}, [dispatch, products, search]);

	return (
		<div id="product" className="mx-36 flex flex-col">
			<div className="top grid grid-cols-[1fr,1fr,0.6fr] bg-gray-200 p-2 items-center rounded-md">
				<div className="icon flex gap-5 ">
					<BsFillGridFill
						size={26}
						className={
							grid
								? "text-blue-700 scale-110 cursor-pointer shadow-lg shadow-blue-600"
								: "text-orange-600 cursor-pointer"
						}
						onClick={() => setGrid(true)}
					/>
					<FaListAlt
						size={26}
						className={
							!grid
								? "text-blue-700 scale-110 cursor-pointer shadow-lg shadow-blue-600"
								: "text-orange-600 cursor-pointer"
						}
						onClick={() => setGrid(false)}
					/>
					<p className="ml-10 text-lg font-semibold">
						<b>{filteredProducts.length}</b> products found
					</p>
				</div>
				{/* search icon */}
				<div className="">
					<Search value={search} onChange={(e) => setSearch(e.target.value)} />
				</div>
				{/* sort products */}
				<div className="h-10 flex justify-end items-center ">
					<label className="text-lg font-semibold">Sort By : </label>
					<select
						name=""
						value={sort}
						onChange={(e) => setSort(e.target.value)}
						className="w-[75%] h-8 border-2 border-[#777] ml-1"
					>
						<option value="latest">Latest</option>
						<option value="lowest-price">Lowest Price</option>
						<option value="highest-price">Highest Price</option>
						<option value="a-z">A-Z</option>
						<option value="z-a">Z-A</option>
					</select>
				</div>
			</div>
			<div
				className={
					grid ? "grid grid-cols-3 gap-12 my-16 " : "flex flex-col gap-12 my-16"
				}
			>
				{products.length === 0 ? (
					<p>No Products Found.</p>
				) : (
					<>
						{currentProducts.map((item) => {
							return (
								<div
									key={item.id}
									className={
										grid
											? "bg-gray-100 h-[100%] w-[90%]flex justify-center shadow-lg rounded-md"
											: " h-[100%] w-[100%] flex justify-around"
									}
								>
									<ProductItem {...item} grid={grid} product={item} />
								</div>
							);
						})}
					</>
				)}
			</div>
			<div className="flex justify-center w-full mb-8">
				<Pagination
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					productsPerPage={productsPerPage}
					totalProducts={filteredProducts.length}
				/>
			</div>
		</div>
	);
};

export default ProductList;
