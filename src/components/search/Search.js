import React from "react";
import { BiSearch } from "react-icons/bi";

const Search = ({ value, onChange }) => {
	return (
		<div className="flex">
			<BiSearch size={18} className=" translate-x-6 translate-y-2" />
			<input
				type="text"
				name=""
				id=""
				placeholder="    Search by name"
				value={value}
				onChange={onChange}
				className="border-2 border-[#777] w-[60%] pl-6  h-8"
			/>
		</div>
	);
};

export default Search;
