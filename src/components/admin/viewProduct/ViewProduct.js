import { deleteDoc, doc } from "firebase/firestore";

import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/config";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { deleteObject, ref } from "firebase/storage";
import Loader from "../../loader/Loader";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import {
	selectProduct,
	STORE_PRODUCTS,
} from "../../../redux/slice/productSlice";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import {
	FILTER_BY_SEARCH,
	selectFilteredProducts,
} from "../../../redux/slice/filterSlice";
import Search from "../../search/Search";
import Pagination from "../../pagination/Pagination";

const ViewProduct = () => {
	const { data, isLoading } = useFetchCollection("products");
	const [search, setSearch] = useState("");

	const products = useSelector(selectProduct);
	const filteredProducts = useSelector(selectFilteredProducts);

	//pagination states
	const [currentPage, setCurrentPage] = useState(1);
	const [productsPerPage] = useState(6);
	//get current product
	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

	const currentProducts = filteredProducts.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(
			STORE_PRODUCTS({
				products: data,
			})
		);
	}, [dispatch, data]);

	useEffect(() => {
		dispatch(FILTER_BY_SEARCH({ products, search }));
	}, [dispatch, products, search]);

	const confirmDelete = (id, imageURL) => {
		Notiflix.Confirm.show(
			"Delete Product ..",
			"You are about to delete this product ?",
			"Delete",
			"Cancel",
			function okCb() {
				deleteProduct(id, imageURL);
			},
			function cancelCb() {
				console.log("delete cancelled");
			},
			{
				width: "320px",
				borderRadius: "3px",
				titleColor: "orangered",
				okButtonBackground: "orangered",
				cssAnimationStyle: "zoom",
			}
		);
	};

	const deleteProduct = async (id, imageURL) => {
		try {
			await deleteDoc(doc(db, "products", id));

			const storageRef = ref(storage, imageURL);
			await deleteObject(storageRef);
			toast.success("Product deleted successfully");
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<>
			{isLoading && <Loader />}
			<div className=" flex flex-col items-center mb-8">
				<h2 className="text-5xl font-semibold text-black py-8 w-[80%] text-center">
					All Products
				</h2>
				<div className="w-[80%] shadow-lg p-2 grid grid-cols-2 my-5 ">
					<p className="text-xl ">
						<span className="font-bold">{filteredProducts.length}</span>{" "}
						products found
					</p>
					<Search value={search} onChange={(e) => setSearch(e.target.value)} />
				</div>
				{filteredProducts.length === 0 ? (
					<p>No product found</p>
				) : (
					<div className=" w-[80%] h-full">
						<div className="grid grid-cols-6 mb-8 text-2xl font-semibold items-center border-4 border-slate-500 bg-slate-400 shadow-xl py-4 justify-items-center">
							<div>S/N</div>
							<div>Image</div>
							<div>Name</div>
							<div>Category</div>
							<div>Price</div>
							<div>Actions</div>
						</div>
						{currentProducts.map((product, index) => {
							const { id, name, price, imageURL, category } = product;
							return (
								<div
									className="grid grid-cols-6 h-[150px] border border-slate-200 items-center justify-items-center shadow-lg mb-2"
									key={id}
								>
									<div>{index + 1}</div>
									<div>
										<img
											src={imageURL}
											alt={name}
											className="w-[100px] h-[100px]"
										/>
									</div>
									<div>{name}</div>
									<div>{category}</div>
									<div className="">{`$${price}`}</div>
									<div className="flex gap-2">
										<NavLink to={`/admin/add-product/${id}`}>
											<FaEdit size={20} className="text-green-600" />
										</NavLink>
										<FaTrashAlt
											size={18}
											className="text-red-600 cursor-pointer"
											onClick={() => confirmDelete(id, imageURL)}
										/>
									</div>
								</div>
							);
						})}
					</div>
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
		</>
	);
};

export default ViewProduct;
