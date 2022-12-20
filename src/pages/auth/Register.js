import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import registerImg from "../../assets/register.jpg";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../components/loader/Loader";

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [cpassword, setCPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const registerUser = (e) => {
		e.preventDefault();
		if (password !== cpassword) {
			toast.error("Passwords do not match");
		}
		setIsLoading(true);
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log(user);

				toast.success("Registration Successful ....");
				setIsLoading(false);
				navigate("/");
			})
			.catch((error) => {
				toast.error(error.code, error.message);
				setIsLoading(false);
			});
		//console.log(email, password, cpassword);
	};
	return (
		<>
			{isLoading && <Loader />}
			<section className="h-screen  flex  justify-center items-center">
				<div className="container px-6 py-12 h-full ">
					<div className="flex flex-row-reverse justify-center items-center flex-wrap h-full gap-6 text-gray-800 ">
						<div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
							<img src={registerImg} className="w-full" alt="Login" />
						</div>

						<div className="md:w-8/12 lg:w-5/12 lg:ml-20   border-2 border-solid border-transparent shadow-md rounded-md overflow-hidden p-6">
							<h2 className="text-center text-4xl font-semibold mt-5 mb-8 text-blue-700">
								Register
							</h2>
							<form onSubmit={registerUser}>
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
								<div className="mb-6">
									<input
										type="password"
										className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
										placeholder="Password"
										required
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>
								<div className="mb-6">
									<input
										type="password"
										className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
										placeholder="Confirm Password"
										required
										value={cpassword}
										onChange={(e) => setCPassword(e.target.value)}
									/>
								</div>

								<button
									type="submit"
									className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light"
								>
									Register
								</button>

								<div className="py-5">
									<NavLink
										to="/login"
										className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
									>
										<span className="text-sm text-blue-500">
											Already have an account?
										</span>{" "}
										Login
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

export default Register;
