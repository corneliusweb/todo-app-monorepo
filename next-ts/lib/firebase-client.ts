// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAGCJ5fVu1pZtkwbJ3tK_qp8QV85bIiIUI',
	authDomain: 'todo-app-auth-99c6b.firebaseapp.com',
	projectId: 'todo-app-auth-99c6b',
	storageBucket: 'todo-app-auth-99c6b.firebasestorage.app',
	messagingSenderId: '331012806731',
	appId: '1:331012806731:web:ad4291f57c8c492ac255ce',
	measurementId: 'G-W8NE2NCBVJ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
