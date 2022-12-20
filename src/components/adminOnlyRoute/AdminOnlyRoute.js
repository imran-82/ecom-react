import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectEmail } from "../../redux/slice/authSlice";

const AdminOnlyRoute = ({ children }) => {
	const userEmail = useSelector(selectEmail);
	if (userEmail === "imran.mik1982@gmail.com") {
		return children;
	}
	return (
		<div className="container">
			<h2>Permission Denied</h2>
			<p>This page can only be visited by admin user</p>
			<br />
			<hr />
			<NavLink to="/">Go to Home Page</NavLink>
		</div>
	);
};

export const AdminOnlyLink = ({ children }) => {
	const userEmail = useSelector(selectEmail);
	if (userEmail === "imran.mik1982@gmail.com") {
		return children;
	}
	return null;
};

export default AdminOnlyRoute;
