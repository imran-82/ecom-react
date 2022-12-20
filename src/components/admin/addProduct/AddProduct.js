import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import {
	deleteObject,
	getDownloadURL,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/config";
import { selectProduct } from "../../../redux/slice/productSlice";

const categories = [
	{ id: 1, name: "Cake" },
	{ id: 2, name: "Flower" },
	{ id: 3, name: "Wine" },
	{ id: 4, name: "Gift" },
];

const initialState = {
	name: "",
	imageURL: "",
	price: 0,
	category: "",
	brand: "",
	desc: "",
};

function detectForm(id, f1, f2) {
	if (id === "ADD") {
		return f1;
	}
	return f2;
}

const AddProducts = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const products = useSelector(selectProduct);
	console.log(products);
	const productToUpdate = products.find((prod) => prod.id === id);
	console.log(productToUpdate);

	const [product, setProduct] = useState(() => {
		const newState = detectForm(id, { ...initialState }, productToUpdate);
		return newState;
	});

	const [uploadProgress, setUploadProgress] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setProduct({ ...product, [name]: value });
	};
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		console.log(file);

		const storageRef = ref(storage, `ecomImages/${Date.now()}${file.name}`);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setUploadProgress(progress);
			},
			(error) => {
				toast.error(error.message);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setProduct({ ...product, imageURL: downloadURL });
					toast.success("Image Uploaded Successfully");
				});
			}
		);
	};

	const updateProduct = (e) => {
		e.preventDefault();
		setIsLoading(true);
		if (product.imageURL !== productToUpdate.imageURL) {
			const storageRef = ref(storage, productToUpdate.imageURL);
			deleteObject(storageRef);
		}

		try {
			setDoc(doc(db, "products", id), {
				name: product.name,
				imageURL: product.imageURL,
				price: Number(product.price),
				category: product.category,
				brand: product.brand,
				desc: product.desc,
				createdAt: productToUpdate.createdAt,
				updatedAt: Timestamp.now().toDate(),
			});

			setIsLoading(false);
			toast.success("Product Updated Successfully");
			navigate("/admin/all-products");
		} catch (error) {
			setIsLoading(false);
			toast.error(error.message);
		}
	};

	const addProduct = (e) => {
		e.preventDefault();
		console.log(product);
		setIsLoading(true);

		try {
			addDoc(collection(db, "products"), {
				name: product.name,
				imageURL: product.imageURL,
				price: Number(product.price),
				category: product.category,
				brand: product.brand,
				desc: product.desc,
				createdAt: Timestamp.now().toDate(),
			});
			setIsLoading(false);
			toast.success("Product uploaded successfully");
			setUploadProgress(0);
			setProduct({ ...initialState });
			document.getElementById("ImageInput").value = "";
		} catch (error) {
			setIsLoading(false);
			toast.error(error.message);
		}
	};
	return (
		<div className=" flex justify-center items-center mb-28">
			<div className="w-[40%]  m-5 p-5 rounded-xl shadow-xl shadow-gray-500">
				<div className="text-center font-semibold text-4xl mb-10  underline decoration-red-500/30 underline-offset-4 ">
					{detectForm(id, "Add New Product", "Update Product")}
				</div>
				<div>
					<form onSubmit={detectForm(id, addProduct, updateProduct)}>
						<label className="text-xl font-medium ">Product Name :</label>
						<input
							type="text"
							required
							placeholder="Product Name"
							value={product.name}
							name="name"
							onChange={(e) => handleInputChange(e)}
							className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mb-3"
						/>

						<label className="text-xl font-medium ">Product Image :</label>
						<div className="shadow-lg p-3  shadow-gray-300 mb-3">
							<div className="progress  bg-gray-500 rounded-xl mb-2">
								{uploadProgress === 0 ? null : (
									<div
										className="progressbar h-6 bg-blue-600 rounded-xl px-2"
										style={{ width: `${uploadProgress}%` }}
									>
										{uploadProgress < 100
											? `${Math.ceil(uploadProgress)}%`
											: `upload completed ${uploadProgress}%`}
									</div>
								)}
							</div>
							<input
								id="ImageInput"
								type="file"
								placeholder="Product Image"
								accept="image/*"
								name="image"
								onChange={(e) => handleImageChange(e)}
								className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mb-3"
							/>
							{product.imageURL === "" ? null : (
								<input
									type="text"
									name="image"
									placeholder="ImageURL"
									value={product.imageURL}
									disabled
									className=" form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mb-3"
								/>
							)}
						</div>
						<label className="text-xl font-medium ">Product Price :</label>
						<input
							type="number"
							required
							placeholder="Product Price"
							value={product.price}
							name="price"
							onChange={(e) => handleInputChange(e)}
							className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mb-3"
						/>
						<label className="text-xl font-medium ">Product Category :</label>
						<select
							required
							name="category"
							value={product.category}
							onChange={(e) => handleInputChange(e)}
							className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mb-3"
						>
							<option value="" disabled>
								-- Choose Product Category --
							</option>
							{categories.map((cat) => {
								return (
									<option key={cat.id} value={cat.name} name={cat.name}>
										{cat.name}
									</option>
								);
							})}
						</select>
						<label className="text-xl font-medium ">
							Product Company/Brand :
						</label>
						<input
							type="text"
							required
							placeholder="Product Brand"
							value={product.brand}
							name="brand"
							onChange={(e) => handleInputChange(e)}
							className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mb-3"
						/>

						<label className="text-xl font-medium ">
							Product Description :
						</label>
						<textarea
							name="desc"
							required
							value={product.desc}
							cols="30"
							rows="10"
							onChange={(e) => handleInputChange(e)}
							className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
						></textarea>
						<div className="mt-9 flex justify-center items-center">
							<button
								className="bg-blue-600 px-2 py-1  font-semibold rounded-md"
								type="submit"
							>
								{detectForm(id, "Save Product", "Update Product")}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddProducts;
