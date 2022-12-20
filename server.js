require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const app = express();
const path = require("path");

app.use(cors());

app.use(express.json());

if (process.env.NODE_ENV === "production") {
	app.use(express.static("build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "build", "index.html"));
	});
}

app.get("/", (req, res) => {
	res.send("welcome to ecom website");
});

const calculateOrderAmount = (items) => {
	const totalSum = items.reduce(
		(accumulator, currentItem) =>
			accumulator + currentItem.price * currentItem.cartQuantity,
		0
	);

	return totalSum * 100;
};

app.post("/create-payment-intent", async (req, res) => {
	const { items, shipping, description } = req.body;

	const paymentIntent = await stripe.paymentIntents.create({
		amount: calculateOrderAmount(items),
		currency: "inr",
		automatic_payment_methods: {
			enabled: true,
		},
		description,
		shipping: {
			address: {
				line1: shipping.line1,
				line2: shipping.line2,
				city: shipping.city,
				country: shipping.country,
				postal_code: shipping.postal_code,
			},
			name: shipping.name,
			phone: shipping.phone,
		},
		//receipt_email: customerEmail,
	});

	res.send({
		clientSecret: paymentIntent.client_secret,
	});
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`));
