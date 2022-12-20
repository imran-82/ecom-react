import React from "react";
import { useEffect } from "react";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import {
	CALC_TOTAL_ORDER_AMOUNT,
	selectOrderHistory,
	selectTotalOrderAmount,
	STORE_ORDERS,
} from "../../../redux/slice/orderSlice";
import {
	selectProduct,
	STORE_PRODUCTS,
} from "../../../redux/slice/productSlice";
import Chart from "../../chart/Chart";
import InfoBox from "../../infoBox/InfoBox";

const earningIcon = (
	<AiFillDollarCircle size={50} className="text-purple-800" />
);
const productIcon = <BsCart4 size={50} className="text-pink-800" />;

const ordersIcon = <FaCartArrowDown size={50} className="text-orange-800" />;

const Home = () => {
	const products = useSelector(selectProduct);
	const totalOrderAmount = useSelector(selectTotalOrderAmount);
	const orders = useSelector(selectOrderHistory);

	const fbProducts = useFetchCollection("products");
	const { data } = useFetchCollection("orders");
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(
			STORE_PRODUCTS({
				products: fbProducts.data,
			})
		);

		dispatch(STORE_ORDERS(data));
		dispatch(CALC_TOTAL_ORDER_AMOUNT());
	}, [dispatch, fbProducts, data]);
	return (
		<div className="mt-[100px]">
			<h2 className="text-5xl font-bold text-center mb-16">Admin Home</h2>
			<div className="m-8 flex gap-20 justify-evenly">
				<InfoBox
					cardClass={
						"text-purple-500 shadow-purple-400 border border-purple-400"
					}
					title={"Earnings"}
					count={`$${totalOrderAmount}`}
					icon={earningIcon}
				/>
				<InfoBox
					cardClass={"text-pink-500 shadow-pink-400 border border-pink-400"}
					title={"Products"}
					count={products.length}
					icon={productIcon}
				/>
				<InfoBox
					cardClass={
						"text-orange-500 shadow-orange-400 border border-orange-400"
					}
					title={"Orders"}
					count={orders.length}
					icon={ordersIcon}
				/>
			</div>
			<div>
				<Chart />
			</div>
		</div>
	);
};

export default Home;
