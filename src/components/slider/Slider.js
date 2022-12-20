import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { sliderData } from "./slider-data";
import "./Slider.scss";

const Slider = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const slideLength = sliderData.length;

	const autoScroll = true;

	const nextSlide = () => {
		setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
	};
	const prevSlide = () => {
		setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
	};

	useEffect(() => {
		setCurrentSlide(0);
	}, []);

	useEffect(() => {
		let slideInterval;
		let intervalTime = 5000;
		function auto() {
			slideInterval = setInterval(nextSlide, intervalTime);
		}
		if (autoScroll) {
			auto();
		}
		return () => clearInterval(slideInterval);
	}, [currentSlide]);

	return (
		<div className="bg-red-500 flex justify-center items-center">
			<div className="slider">
				<AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
				<AiOutlineArrowRight className="arrow next" onClick={nextSlide} />
				{sliderData.map((slide, index) => {
					const { image, heading, desc } = slide;
					return (
						<div
							className={index === currentSlide ? "slide current " : "slide"}
							key={index}
						>
							{index === currentSlide && (
								<>
									<img src={image} alt="slide" className="" />
									<div className="content ">
										<h2>{heading}</h2>
										<p>{desc}</p>
										<hr />
										<a href="#products" className="bg-blue-500 p-2 rounded-md">
											Shop Now
										</a>
									</div>
								</>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Slider;
