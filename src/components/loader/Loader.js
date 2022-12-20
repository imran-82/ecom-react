import loaderImg from "../../assets/loader.gif";
import ReactDOM from "react-dom";

const Loader = () => {
	return ReactDOM.createPortal(
		<div className="fixed w-screen h-screen bg-[#000000] opacity-70 z-10">
			<div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
				<img src={loaderImg} alt="Loading..." />
			</div>
		</div>,
		document.getElementById("loader")
	);
};

export default Loader;
