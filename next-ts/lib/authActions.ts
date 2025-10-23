'use client';
import { auth } from './firebase-client';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
} from 'firebase/auth';

// Email + Password sign up
export const signUp = async (email: string, password: string) => {
	await createUserWithEmailAndPassword(auth, email, password);
};

// Email + Password sign in
export const signIn = async (email: string, password: string) => {
	await signInWithEmailAndPassword(auth, email, password);
};

// Google sign in
const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
	await signInWithPopup(auth, googleProvider);
};
