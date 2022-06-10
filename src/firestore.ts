import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const config = {
  apiKey: "AIzaSyAXTJW3SnCI3nT0xN8k8PMq92pz0iwMkU4",
  authDomain: "book-catalog-2.firebaseapp.com",
  projectId: "book-catalog-2",
  storageBucket: "book-catalog-2.appspot.com",
  messagingSenderId: "370771363078",
  appId: "1:370771363078:web:a6b73cf869d53df258ca87",
}

export const firestoreApp = initializeApp(config)
export const db = getFirestore(firestoreApp)
