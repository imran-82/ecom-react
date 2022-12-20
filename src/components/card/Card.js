import React from "react";

const Card = ({ children }) => {
	return (
		<div className="border border-solid border-transparent shadow-md rounded-md overflow-hidden">
			{children}
		</div>
	);
};

export default Card;
