import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const config = {
  apiKey: "AIzaSyDHd7M1sYTZowoydWRxLu1G56XH4jSnarQ",
  authDomain: "book-catalog-ff906.firebaseapp.com",
  projectId: "book-catalog-ff906",
  storageBucket: "book-catalog-ff906.appspot.com",
  messagingSenderId: "663097301726",
  appId: "1:663097301726:web:854693a95a28f78608404f",
}

export const firestoreApp = initializeApp(config)
export const db = getFirestore(firestoreApp)
