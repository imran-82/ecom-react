import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../customHooks/useFetchCollection";
import {
	GET_PRICE_RANGE,
	selectProduct,
	STORE_PRODUCTS,
} from "../../redux/slice/productSlice";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import spinnerImg from "../../assets/spinner.jpg";

const Product = () => {
	const { data, isLoading } = useFetchCollection("products");

	const products = useSelector(selectProduct);
	//console.log(products);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(
			STORE_PRODUCTS({
				products: data,
			})
		);

		dispatch(
			GET_PRICE_RANGE({
				products: data,
			})
		);
	}, [dispatch, data]);
	return (
		<section>
			<div className="grid grid-cols-[0.2fr,1fr] mt-5">
				<aside>{isLoading ? null : <ProductFilter />}</aside>
				<div
					className={isLoading ? "flex justify-center items-center mr-48" : ""}
				>
					{isLoading ? (
						<img src={spinnerImg} alt="Loading..." className="w-96 " />
					) : (
						<ProductList products={products} />
					)}
				</div>
			</div>
		</section>
	);
};

export default Product;
