// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXsSV25YjGV4wcxNanoezU4SsUYkbaifM",
  authDomain: "crwn-clothing-db-a5fcf.firebaseapp.com",
  projectId: "crwn-clothing-db-a5fcf",
  storageBucket: "crwn-clothing-db-a5fcf.appspot.com",
  messagingSenderId: "1036016128368",
  appId: "1:1036016128368:web:6594f43a6304415fd7bfb5",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  promp: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid); // doc(database, collection, document_unique_id)
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (err) {
      console.log("Error creating the user", err.message);
    }
  }

  return userDocRef;
};
