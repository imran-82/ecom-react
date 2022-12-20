import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { FaEnvelope, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { toast } from "react-toastify";

const ContactUs = () => {
	const form = useRef();

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs
			.sendForm(
				process.env.REACT_APP_EMAILJS_SERVICE_ID,
				"template_m6p7msj",
				form.current,
				"RXxzQZKeXnEIGiIOD"
			)
			.then(
				(result) => {
					toast.success("Message was sent successfully");
				},
				(error) => {
					toast.error(error.text);
				}
			);
		e.target.reset();
	};
	return (
		<div className="my-10">
			<h1 className="text-5xl text-center font-bold mb-10">Contact Us</h1>
			<div className="grid grid-cols-2 m-8 justify-items-center">
				<div className="w-[80%]">
					<form ref={form} onSubmit={sendEmail}>
						<div className="flex flex-col gap-2 mt-2">
							<label className="text-xl font-semibold">Name :</label>
							<input
								type="text"
								name="user_name"
								placeholder="Full Name"
								required
								className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
							/>
						</div>
						<div className="flex flex-col gap-2 mt-2">
							<label className="text-xl font-semibold">Email :</label>
							<input
								type="email"
								name="user_email"
								placeholder="Your Active Email"
								required
								className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
							/>
						</div>
						<div className="flex flex-col gap-2 mt-2">
							<label className="text-xl font-semibold">Subject :</label>
							<input
								type="text"
								name="subject"
								placeholder="Subject"
								required
								className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
							/>
						</div>
						<div className="flex flex-col gap-2 mt-2">
							<label className="text-xl font-semibold">Message : </label>
							<textarea
								name="message"
								id=""
								cols="30"
								rows="10"
								className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
							></textarea>
						</div>
						<div className="mt-4">
							<button
								type="submit"
								className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
							>
								Send Message
							</button>
						</div>
					</form>
				</div>
				<div>
					<div className="mt-8 flex flex-col gap-2 bg-blue-500 p-5 rounded-md shadow-lg shadow-blue-300">
						<p className="text-xl font-semibold">Our Contact Information</p>
						<p className="text-xl font-semibold">
							Fill the form or contact us via other channels below
						</p>
						<div className="flex flex-col gap-2 mt-4">
							<p className="flex gap-4 h-8  justify-start items-center">
								<FaPhoneAlt size={20} />
								<span className="text-xl font-semibold">+111111111</span>
							</p>
							<p className="flex gap-5 h-8  justify-start items-center">
								<FaEnvelope />
								<span className="text-xl font-semibold">test1@gmail.com</span>
							</p>
							<p className="flex gap-5 h-8  justify-start items-center">
								<GoLocation />
								<span className="text-xl font-semibold">
									Melbourne ,Australia
								</span>
							</p>
							<p className="flex gap-5 h-8  justify-start items-center">
								<FaTwitter />{" "}
								<span className="text-xl font-semibold">@kkkkkkk</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactUs;
