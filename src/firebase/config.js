import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
	apiKey: process.env.REACT_APP_FB_API_KEY,
	authDomain: "ecom-prashant.firebaseapp.com",
	projectId: "ecom-prashant",
	storageBucket: "ecom-prashant.appspot.com",
	messagingSenderId: "533094340173",
	appId: "1:533094340173:web:a0b2723cafa638d29fee04",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
