// lib/firebase/clientApp.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyAGCJ5fVu1pZtkwbJ3tK_qp8QV85bIiIUI',
	authDomain: 'todo-app-auth-99c6b.firebaseapp.com',
	projectId: 'todo-app-auth-99c6b',
	storageBucket: 'todo-app-auth-99c6b.firebasestorage.app',
	messagingSenderId: '331012806731',
	appId: '1:331012806731:web:ad4291f57c8c492ac255ce',
	measurementId: 'G-W8NE2NCBVJ',
};

function createFirebaseApp() {
	try {
		return !getApps().length ? initializeApp(firebaseConfig) : getApp();
	} catch (err) {
		// if initialize fails, try to return existing app
		return getApp();
	}
}

const app = createFirebaseApp();
export const auth = getAuth(app);
export default app;
