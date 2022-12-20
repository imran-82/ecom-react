import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { auth } from "../../firebase/config";
import loginImg from "../../assets/login.jpg";
import { toast } from "react-toastify";
import {
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
} from "firebase/auth";
import Loader from "../../components/loader/Loader";
import { useSelector } from "react-redux";
import { selectPreviousURL } from "../../redux/slice/cartSlice";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const provider = new GoogleAuthProvider();
	const previousURL = useSelector(selectPreviousURL);

	const redirectUser = () => {
		if (previousURL.includes("cart")) {
			return navigate("/cart");
		}
		navigate("/");
	};

	const loginUser = (e) => {
		e.preventDefault();
		setIsLoading(true);
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				setIsLoading(false);
				toast.success("Login Successfull...");
				redirectUser();
			})
			.catch((error) => {
				toast.error(error.message);
				setIsLoading(false);
			});
	};

	//Login with google

	const signInWithGoogle = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				const user = result.user;
				toast.success("Login Successfull....");
				redirectUser();
			})
			.catch((error) => {
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
							<img src={loginImg} className="w-full" alt="Login" />
						</div>

						<div className="md:w-8/12 lg:w-5/12 lg:ml-20   border-2 border-solid border-transparent shadow-md rounded-md overflow-hidden p-6">
							<h2 className="text-center text-4xl font-semibold mt-5 mb-8 text-blue-700">
								Login
							</h2>
							<form onSubmit={loginUser}>
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
								<div className="py-5">
									<NavLink
										to="/reset"
										className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
									>
										Forgot password?
									</NavLink>
								</div>
								<button
									type="submit"
									className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light"
								>
									Login
								</button>
								<div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
									<p className="text-center font-semibold mx-4 mb-0">OR</p>
								</div>
								<button
									type="submit"
									className="inline-block px-7 py-3 bg-red-400 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out w-full"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light"
									onClick={signInWithGoogle}
								>
									<FaGoogle className="inline-block mx-2" />
									Login with Google
								</button>
								<div className="py-5">
									<NavLink
										to="/register"
										className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
									>
										<span className="text-sm text-blue-500">
											Don't have an account?
										</span>{" "}
										Register
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

export default Login;
