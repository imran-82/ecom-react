import React, { useState } from "react";

const Pagination = ({
	currentPage,
	setCurrentPage,
	productsPerPage,
	totalProducts,
}) => {
	const pageNumbers = [];
	const totalPages = totalProducts / productsPerPage;
	//limit the page numbers shown
	const [pageNumberLimit, setPageNumberLimit] = useState(2);
	const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
	const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(2);

	//paginate
	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	//go to next page

	const paginateNext = () => {
		setCurrentPage(currentPage + 1);
		if (currentPage + 1 > maxPageNumberLimit) {
			setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
			setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
		}
	};

	//go to previous page
	const paginatePrev = () => {
		setCurrentPage(currentPage - 1);
		if ((currentPage - 1) % pageNumberLimit === 0) {
			setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
			setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
		}
	};

	for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<ul className="flex">
			<li
				className={
					currentPage === pageNumbers[0]
						? "invisible p-3 border-2 border-black cursor-pointer"
						: "p-3 border-2 border-black cursor-pointer  bg-slate-400 active:bg-slate-600 hover:bg-slate-500"
				}
				//className="p-3 border-2 border-black cursor-pointer"
				onClick={paginatePrev}
			>
				Prev
			</li>
			{pageNumbers.map((number) => {
				if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
					return (
						<li key={number}>
							<button
								id=""
								className={
									currentPage === number
										? "border-2 border-black bg-orange-600  w-full p-3"
										: "border-2 border-black  w-full p-3"
								}
								//className=" border-2 border-black focus:bg-orange-600  w-full p-3"
								onClick={() => paginate(number)}
							>
								{number}
							</button>
						</li>
					);
				}
			})}
			<li
				className={
					currentPage === pageNumbers[pageNumbers.length - 1]
						? "invisible p-3 border-2 border-black cursor-pointer"
						: "p-3 border-2 border-black cursor-pointer bg-slate-400 active:bg-slate-600 hover:bg-slate-500"
				}
				onClick={paginateNext}
			>
				Next
			</li>
			<div className="flex p-3 gap-1">
				<p className="font-bold text-orange-600">{`page ${currentPage}`}</p>
				<span>of</span>
				<p className="font-bold">{`${Math.ceil(totalPages)}`}</p>
			</div>
		</ul>
	);
};

export default Pagination;
