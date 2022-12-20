import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { selectOrderHistory } from "../../redux/slice/orderSlice";
import { useSelector } from "react-redux";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top",
		},
		title: {
			display: false,
			text: "Chart.js Bar Chart",
		},
	},
};

const Chart = () => {
	const orders = useSelector(selectOrderHistory);
	const placed = orders.filter((item) => item.orderStatus === "Order Placed");
	const processing = orders.filter((item) => item.orderStatus === "Processing");
	const shipped = orders.filter((item) => item.orderStatus === "Shipped");
	const delivered = orders.filter((item) => item.orderStatus === "Delivered");

	const data = {
		labels: ["Orders Placed", "Processing ", "Shipped", "Delivered"],
		datasets: [
			{
				label: "Order Status Count",
				data: [
					placed.length,
					processing.length,
					shipped.length,
					delivered.length,
				],
				backgroundColor: "rgba(255, 99, 132, 0.5)",
			},
		],
	};
	return (
		<div className="mt-24">
			<div className="w-[60%]">
				<h3 className="text-3xl font-bold text-center">Order Status Chart</h3>
				<Bar options={options} data={data} />
			</div>
		</div>
	);
};

export default Chart;
