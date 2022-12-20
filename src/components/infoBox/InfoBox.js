import React from "react";

const InfoBox = ({ cardClass, title, count, icon }) => {
	return (
		<div
			className={`w-[400px] h-[180px] rounded-lg shadow-lg  p-4 flex flex-col justify-between ${cardClass}`}
		>
			<h4 className="text-4xl font-semibold">{title}</h4>
			<span className="flex justify-between items-center ">
				<h3 className="text-7xl font-semibold">{count}</h3>
				{icon}
			</span>
		</div>
	);
};

export default InfoBox;
