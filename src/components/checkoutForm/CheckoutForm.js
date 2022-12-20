import React, { useEffect, useState } from "react";
import spinnerImg from "../../assets/spinner.jpg";
import {
	PaymentElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import CheckoutSummary from "../checkoutSummary/CheckoutSummary";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectEmail, selectUserID } from "../../redux/slice/authSlice";
import {
	CLEAR_CART,
	selectCartItems,
	selectCartTotalAmount,
} from "../../redux/slice/cartSlice";
import { selectShippingAddres } from "../../redux/slice/checkoutSlice";
import { db } from "../../firebase/config";
import { addDoc, collection, Timestamp } from "firebase/firestore";

const CheckoutForm = () => {
	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userId = useSelector(selectUserID);
	const userEmail = useSelector(selectEmail);
	const cartItems = useSelector(selectCartItems);
	const shippingAddress = useSelector(selectShippingAddres);
	const cartTotalAmount = useSelector(selectCartTotalAmount);

	useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get(
			"payment_intent_client_secret"
		);

		if (!clientSecret) {
			return;
		}
	}, [stripe]);

	const saveOrder = () => {
		const today = new Date();
		const date = today.toDateString();
		const time = today.toLocaleTimeString();

		const orderConfig = {
			userId,
			userEmail,
			orderDate: date,
			orderTime: time,
			orderAmount: cartTotalAmount,
			orderStatus: "Order Placed",
			cartItems,
			shippingAddress,
			createdAt: Timestamp.now().toDate(),
		};
		try {
			addDoc(collection(db, "orders"), orderConfig);
			dispatch(CLEAR_CART());
			toast.success("Order saved successfully");
			navigate("/checkout-success");
		} catch (error) {
			toast.error(error.message);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage(null);

		if (!stripe || !elements) {
			return;
		}

		setIsLoading(true);

		const confirmPayment = await stripe
			.confirmPayment({
				elements,
				confirmParams: {
					// Make sure to change this to your payment completion page
					return_url: "http://localhost:3000/checkout-success",
				},
				redirect: "if_required",
			})
			.then((result) => {
				//ok -paymentIntent or  bad - error
				if (result.error) {
					toast.error(result.error.message);
					setMessage(result.error.message);
					return;
				}
				if (result.paymentIntent) {
					if (result.paymentIntent.status === "succeeded") {
						setIsLoading(false);
						toast.success("Payment successful");
						saveOrder();
					}
				}
			});

		setIsLoading(false);
	};

	const paymentElementOptions = {
		layout: "tabs",
	};

	return (
		<section className="mb-14">
			<div>
				<h2 className="text-4xl font-bold text-center mt-8 mb-10">Checkout</h2>
				<form onSubmit={handleSubmit} className="grid grid-cols-2">
					<div>
						<div className=" w-full flex justify-center">
							<CheckoutSummary />
						</div>
					</div>
					<div>
						<div className=" w-[60%] p-4  shadow-lg border border-slate-300 shadow-slate-400">
							<h3 className="text-3xl font-semibold mb-4 mt-8 text-center">
								Stripe Checkout
							</h3>
							<PaymentElement
								id="payment-element"
								options={paymentElementOptions}
							/>
							<button
								disabled={isLoading || !stripe || !elements}
								id="submit"
								className="cursor-pointer border-2 border-blue-800 shadow-blue-300 shadow-md hover:shadow-lg
								 hover:shadow-blue-500 hover:scale-105  bg-blue-500 w-fit px-7 py-1  rounded-md  font-semibold mt-8"
							>
								<span id="button-text">
									{isLoading ? (
										<img
											src={spinnerImg}
											alt="Loading..."
											className="h-[20px]"
										/>
									) : (
										"Pay now"
									)}
								</span>
							</button>
							{/* Show any error or success messages */}
							{message && <div id="payment-message">{message}</div>}
						</div>
					</div>
				</form>
			</div>
		</section>
	);
};

export default CheckoutForm;
