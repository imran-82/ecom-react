import React, { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { sliderData } from "./slider-data";

const Slider1 = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	return (
		<div
			id="carouselExampleCaptions"
			class="carousel slide relative"
			data-bs-ride="carousel"
		>
			<div class="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
				<button
					type="button"
					data-bs-target="#carouselExampleCaptions"
					data-bs-slide-to="0"
					class="active"
					aria-current="true"
					aria-label="Slide 1"
				></button>
				<button
					type="button"
					data-bs-target="#carouselExampleCaptions"
					data-bs-slide-to="1"
					aria-label="Slide 2"
				></button>
				<button
					type="button"
					data-bs-target="#carouselExampleCaptions"
					data-bs-slide-to="2"
					aria-label="Slide 3"
				></button>
			</div>
			<div class="carousel-inner relative w-full overflow-hidden ">
				{sliderData.map((slide, index) => {
					const { image, heading, desc } = slide;
					return (
						<div
							key={index}
							className={
								index === currentSlide
									? "carousel-item active relative float-left w-full"
									: "carousel-item relative float-left w-full"
							}
						>
							{index === currentSlide && (
								<>
									<img src={image} class="block w-[100vw] h-[90vh]" alt="..." />
									<div class="carousel-caption hidden md:block absolute text-center">
										<h5 class="text-xl font-black">{heading}</h5>
										<p>{desc}</p>
									</div>
								</>
							)}
						</div>
					);
				})}

				{/* <div class="carousel-item relative float-left w-full">
					<img
						src="https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg"
						class="block w-full"
						alt="..."
					/>
					<div class="carousel-caption hidden md:block absolute text-center">
						<h5 class="text-xl">Second slide label</h5>
						<p>Some representative placeholder content for the second slide.</p>
					</div>
				</div>
				<div class="carousel-item relative float-left w-full">
					<img
						src="https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg"
						class="block w-full"
						alt="..."
					/>
					<div class="carousel-caption hidden md:block absolute text-center">
						<h5 class="text-xl">Third slide label</h5>
						<p>Some representative placeholder content for the third slide.</p>
					</div>
				</div> */}
			</div>
			<button
				class="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
				type="button"
				data-bs-target="#carouselExampleCaptions"
				data-bs-slide="prev"
			>
				<span
					class="carousel-control-prev-icon inline-block bg-no-repeat"
					aria-hidden="true"
				></span>
				<span class="visually-hidden">Previous</span>
			</button>
			<button
				class="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
				type="button"
				data-bs-target="#carouselExampleCaptions"
				data-bs-slide="next"
			>
				<span
					class="carousel-control-next-icon inline-block bg-no-repeat"
					aria-hidden="true"
				></span>
				<span class="visually-hidden">Next</span>
			</button>
		</div>
	);
};

export default Slider1;
