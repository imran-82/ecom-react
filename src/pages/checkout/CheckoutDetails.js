import { useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSummary from "../../components/checkoutSummary/CheckoutSummary";
import {
	SAVE_BILLING_ADDRESS,
	SAVE_SHIPPING_ADDRESS,
} from "../../redux/slice/checkoutSlice";

const initialAddressState = {
	name: "",
	line1: "",
	line2: "",
	city: "",
	state: "",
	postal_code: "",
	country: "",
	phone: "",
};

const CheckoutDetails = () => {
	const [shippingAddress, setShippingAddress] = useState({
		...initialAddressState,
	});
	const [billingAddress, setBillingAddress] = useState({
		...initialAddressState,
	});
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleShipping = (e) => {
		const { name, value } = e.target;
		setShippingAddress({
			...shippingAddress,
			[name]: value,
		});
	};
	const handleBilling = (e) => {
		const { name, value } = e.target;
		setBillingAddress({
			...billingAddress,
			[name]: value,
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
		dispatch(SAVE_BILLING_ADDRESS(billingAddress));
		navigate("/checkout");
	};

	return (
		<section className="grid grid-cols-2 mt-20 mb-10">
			<div>
				<h2 className="text-4xl text-center font-bold">Checkout Details</h2>
				<form onSubmit={handleSubmit}>
					<div className=" flex flex-col items-center">
						<div className=" flex flex-col p-4 w-[70%] m-6  rounded-md border border-slate-300 shadow-xl shadow-slate-400">
							<h3 className="text-3xl font-semibold mt-6 mb-6 text-center">
								Shipping Address
							</h3>
							<label className="text-xl font-medium mt-4 mb-2">
								Recipient Name :
							</label>
							<input
								type="text"
								placeholder="Recipient Name"
								className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								required
								name="name"
								value={shippingAddress.name}
								onChange={(e) => handleShipping(e)}
							/>
							<label className="text-xl font-medium mt-4 mb-2">
								Address line 1 :
							</label>
							<input
								type="text"
								placeholder="Address line 1"
								className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								required
								name="line1"
								value={shippingAddress.line1}
								onChange={(e) => handleShipping(e)}
							/>
							<label className="text-xl font-medium mt-4 mb-2">
								Address line 2 :
							</label>
							<input
								type="text"
								placeholder="Address line 2"
								className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								name="line2"
								value={shippingAddress.line2}
								onChange={(e) => handleShipping(e)}
							/>
							<label className="text-xl font-medium mt-4 mb-2">City :</label>
							<input
								type="text"
								placeholder="City"
								className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								required
								name="city"
								value={shippingAddress.city}
								onChange={(e) => handleShipping(e)}
							/>
							<label className="text-xl font-medium mt-4 mb-2">State :</label>
							<input
								type="text"
								placeholder="State"
								className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								required
								name="state"
								value={shippingAddress.state}
								onChange={(e) => handleShipping(e)}
							/>
							<label className="text-xl font-medium mt-4 mb-2">
								Postal Code :
							</label>
							<input
								type="text"
								placeholder="Postal code"
								className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								required
								name="postal_code"
								value={shippingAddress.postal_code}
								onChange={(e) => handleShipping(e)}
							/>
							<label className="text-xl font-medium mt-4 mb-2">Country :</label>
							<CountryDropdown
								valueType="short"
								className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								value={shippingAddress.country}
								onChange={(val) =>
									handleShipping({
										target: {
											name: "country",
											value: val,
										},
									})
								}
							/>

							<label className="text-xl font-medium mt-4 mb-2">Phone :</label>
							<input
								type="text"
								placeholder="Phone"
								className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								required
								name="phone"
								value={shippingAddress.phone}
								onChange={(e) => handleShipping(e)}
							/>
						</div>
						<div className=" flex flex-col p-4 w-[70%] m-6  rounded-md border border-slate-300 shadow-xl shadow-slate-400">
							<h3 className="text-3xl font-semibold mt-6 mb-6 text-center">
								Billing Address
							</h3>
							<label className="text-xl font-medium mt-4 mb-2">Name :</label>
							<input
								type="text"
								placeholder="Recipient Name"
								className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								required
								name="name"
								value={billingAddress.name}
								onChange={(e) => handleBilling(e)}
							/>
							<label className="text-xl font-medium mt-4 mb-2">
								Address line 1 :
							</label>
							<input
								type="text"
								placeholder="Address line 1"
								className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								required
								name="line1"
								value={billingAddress.line1}
								onChange={(e) => handleBilling(e)}
							/>
							<label className="text-xl font-medium mt-4 mb-2">
								Address line 2 :
							</label>
							<input
								type="text"
								placeholder="Address line 2"
								className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								name="line2"
								value={billingAddress.line2}
								onChange={(e) => handleBilling(e)}
							/>
							<label className="text-xl font-medium mt-4 mb-2">City :</label>
							<input
								type="text"
								placeholder="City"
								className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								required
								name="city"
								value={billingAddress.city}
								onChange={(e) => handleBilling(e)}
							/>
							<label className="text-xl font-medium mt-4 mb-2">State :</label>
							<input
								type="text"
								placeholder="State"
								className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								required
								name="state"
								value={billingAddress.state}
								onChange={(e) => handleBilling(e)}
							/>
							<label className="text-xl font-medium mt-4 mb-2">
								Postal Code :
							</label>
							<input
								type="text"
								placeholder="Postal code"
								className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								required
								name="postal_code"
								value={billingAddress.postal_code}
								onChange={(e) => handleBilling(e)}
							/>
							<label className="text-xl font-medium mt-4 mb-2">Country :</label>
							<CountryDropdown
								valueType="short"
								className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								value={billingAddress.country}
								onChange={(val) =>
									handleBilling({
										target: {
											name: "country",
											value: val,
										},
									})
								}
							/>

							<label className="text-xl font-medium mt-4 mb-2">Phone :</label>
							<input
								type="text"
								placeholder="Phone"
								className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								required
								name="phone"
								value={billingAddress.phone}
								onChange={(e) => handleBilling(e)}
							/>
							<button
								type="submit"
								className="inline-block px-4 py-2 mt-5 w-[60%] bg-blue-600 text-white font-medium text-lg leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out  "
							>
								Proceed To Checkout
							</button>
						</div>
					</div>
				</form>
			</div>
			<div>
				<div className="w-full  flex justify-center mt-16">
					<CheckoutSummary />
				</div>
			</div>
		</section>
	);
};

export default CheckoutDetails;
