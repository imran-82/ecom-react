import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import StarsRating from "react-star-rate";
import { toast } from "react-toastify";
import useFetchDocument from "../../customHooks/useFetchDocument";
import { db } from "../../firebase/config";
import { selectUserID, selectUserName } from "../../redux/slice/authSlice";

import spinnerImg from "../../assets/spinner.jpg";

const ReviewProducts = () => {
	const [rate, setRate] = useState(0);
	const [review, setReview] = useState("");
	const [product, setProduct] = useState(null);
	const navigate = useNavigate();

	const { id } = useParams();
	const { document } = useFetchDocument("products", id);

	const userID = useSelector(selectUserID);
	const userName = useSelector(selectUserName);

	useEffect(() => {
		setProduct(document);
	}, [document]);

	const submitReview = (e) => {
		e.preventDefault();

		const today = new Date();
		const date = today.toDateString();

		const reviewConfig = {
			userID,
			userName,
			productID: id,
			rate,
			review,
			reviewDate: date,
			createdAt: Timestamp.now().toDate(),
		};
		try {
			addDoc(collection(db, "reviews"), reviewConfig);

			toast.success("Review submitted successfully");
			setRate(0);
			setReview("");
			navigate("/");
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<section className="flex justify-around mb-[60px] mt-[90px] ">
			<div className=" w-[80%] shadow-lg p-2 rounded  pb-[30px]">
				<h2 className=" text-4xl font-bold text-center mb-10">
					Rate this product
				</h2>
				{product === null ? (
					<div className="flex justify-center items-center">
						<img src={spinnerImg} alt="loading ..." />
					</div>
				) : (
					<>
						<p className="font-semibold text-xl mb-5">
							<span className="text-2xl font-semibold mr-8">
								Product Name :
							</span>
							{product.name}
						</p>
						<img
							src={product.imageURL}
							alt={product.name}
							className="w-[200px] h-[200px] ml-[200px] mb-8"
						/>
						<div>
							<form onSubmit={(e) => submitReview(e)}>
								<div className="mt-8 flex flex-row gap-4">
									<p className="text-2xl font-semibold mr-8">Rating :</p>
									<div className="mt-[-20px] ml-[60px]">
										<StarsRating
											value={rate}
											onChange={(rate) => {
												setRate(rate);
											}}
										/>
									</div>
								</div>
								<div className="mt-8 flex flex-row gap-4 mb-12">
									<p className="text-2xl font-semibold mr-8">Review :</p>
									<textarea
										value={review}
										className="border-2 border-black ml-[55px]"
										required
										cols="80"
										rows="15"
										onChange={(e) => setReview(e.target.value)}
									></textarea>
								</div>
								<button
									type="submit"
									className="cursor-pointer border-2 border-blue-800 shadow-blue-300 shadow-md hover:shadow-lg text-white hover:shadow-blue-500 hover:scale-105  bg-blue-500 w-fit px-7 py-1 h-10 rounded-md  font-semibold ml-[190px]"
								>
									Submit Review
								</button>
							</form>
						</div>
					</>
				)}
			</div>
		</section>
	);
};

export default ReviewProducts;
