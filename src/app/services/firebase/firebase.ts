import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCOod7rkj8bJRx2ZYrhGzmjIqbieYbbSj8",
  authDomain: "carefinder-9b1d7.firebaseapp.com",
  projectId: "carefinder-9b1d7",
  storageBucket: "carefinder-9b1d7.appspot.com",
  messagingSenderId: "290580420706",
  appId: "1:290580420706:web:2f7de1729546278f77993b",
  measurementId: "G-BDFV2EG911",
};
const app = initializeApp(firebaseConfig);

// aunthentication
export const auth = getAuth(app);

// Google Authentication
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => signInWithPopup(getAuth(), provider);

// Email and Password Authentication
export const emailSignUp = (email: any, password: any) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const emailSignIn = (email: any, password: any) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Sign out
export const signOut = () => getAuth().signOut();
// storage
export const storage = getStorage(app);

// firestore
export const db = getFirestore(app);
export const addData: any = async (
  collection: string,
  id: string,
  data: any
) => {
  let result = null;
  let error = null;

  try {
    result = await setDoc(doc(db, collection, id), data, {
      merge: true,
    });
  } catch (err) {
    error = err;
  }

  return { result, error };
};
