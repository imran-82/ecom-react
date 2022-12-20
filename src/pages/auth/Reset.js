import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import resetImg from "../../assets/reset.jpg";
import { auth } from "../../firebase/config";
import Loader from "../../components/loader/Loader";

const Reset = () => {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const resetPassword = (e) => {
		e.preventDefault();
		setIsLoading(true);
		sendPasswordResetEmail(auth, email)
			.then(() => {
				setIsLoading(false);
				toast.success("Check your email for rest link");
			})
			.catch((error) => {
				setIsLoading(false);
				toast.error(error.message);
			});
	};
	return (
		<>
			{isLoading && <Loader />}
			<section className="h-screen  flex justify-center items-center">
				<div className="container px-6 py-12 h-full ">
					<div className="flex justify-center items-center flex-wrap h-full gap-6 text-gray-800 ">
						<div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
							<img src={resetImg} className="w-full" alt="Login" />
						</div>

						<div className="md:w-8/12 lg:w-5/12 lg:ml-20   border-2 border-solid border-transparent shadow-md rounded-md overflow-hidden p-6">
							<h2 className="text-center text-4xl font-semibold mt-5 mb-8 text-blue-700">
								Reset Password
							</h2>
							<form onSubmit={resetPassword}>
								<div className="mb-6">
									<input
										type="text"
										className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
										placeholder="Email address"
										required
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>

								<button
									type="submit"
									className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light"
								>
									Reset Password
								</button>

								<div className="py-5 flex justify-between">
									<NavLink
										to="/register"
										className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
									>
										-Register
									</NavLink>
									<NavLink
										to="/login"
										className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
									>
										-Login
									</NavLink>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Reset;
