import React from "react";
import { NavLink } from "react-router-dom";

import { FaDiscord, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
	return (
		<div className="m-0">
			{/* footer section */}

			<footer className="w-full m-0 bg-sky-900 ">
				<div className="  grid grid-cols-4 text-white py-[2rem] px-[2rem]  gap-12 ">
					<div className="footer-about justify-items-center">
						<h3 className="mb-[1rem] text-xl font-semibold">DESIGNER STORE</h3>
						<p>
							We deliver gift items currently only in Melbourne. We are adding
							more services. Please contact us if you want more details{" "}
						</p>
					</div>
					<div className="footer-subscribe">
						<h3 className="text-xl font-semibold">SERVICES</h3>
						<ul>
							<li>
								<NavLink to="/register">Register</NavLink>
							</li>
							<li>
								<NavLink to="/orderhistory">My Order</NavLink>
							</li>
							<li>
								<NavLink to="/contact">Help Desk</NavLink>
							</li>
							<li>
								<NavLink>Work with us</NavLink>
							</li>
						</ul>
					</div>
					<div className="footer-social ">
						<h3 className="text-xl font-semibold">FOLLOW US</h3>
						<div className="flex gap-4 py-5">
							<div className="bg-sky-900 h-11 w-11 p-1 flex justify-center items-center rounded-full border-2 border-white cursor-pointer">
								<FaDiscord className="text-2xl" />
							</div>
							<div className="bg-sky-900 h-11 w-11 p-1 flex justify-center items-center rounded-full border-2 border-white cursor-pointer">
								<FaInstagram className="text-2xl" />
							</div>
							<div className="bg-sky-900 h-11 w-11 p-1 flex justify-center items-center rounded-full border-2 border-white cursor-pointer">
								<a href="https://www.youtube.com" target="_blank">
									<FaYoutube className="text-2xl" />
								</a>
							</div>
						</div>
					</div>
					<div className="footer-contact ">
						<h3 className="text-xl font-semibold">CALL US</h3>
						<h3 className="my-5">+91 12345678978</h3>
					</div>
				</div>

				<div className="footer-bottom--section">
					<hr />
					<div className=" flex justify-evenly py-6 text-white ">
						<p>
							@{new Date().getFullYear()} Mohd Imran Khan. All Rights Reserved
						</p>
						<div>
							<p>PRIVACY POLICY</p>
							<p>TERMS & CONDITIONS</p>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
