import React from "react";
import { Route, Routes } from "react-router-dom";
import SidePanel from "../../components/admin/sidePanel/SidePanel";
import Home from "../../components/admin/home/Home";
import ViewProduct from "../../components/admin/viewProduct/ViewProduct";
import AddProduct from "../../components/admin/addProduct/AddProduct";
import Orders from "../../components/admin/orders/Orders";
import OrderDetails from "../../components/admin/orderDetails/OrderDetails";

const Admin = () => {
	return (
		<div className="flex">
			<div className="w-72">
				<SidePanel />
			</div>
			<div className=" w-full">
				<Routes>
					<Route path="home" element={<Home />} />
					<Route path="all-products" element={<ViewProduct />} />
					<Route path="/add-product/:id" element={<AddProduct />} />
					<Route path="orders" element={<Orders />} />
					<Route path="order-details/:id" element={<OrderDetails />} />
				</Routes>
			</div>
		</div>
	);
};

export default Admin;
