import React from 'react'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { createRoot } from 'react-dom/client'
import { AppContextProvider } from './AppContext'

import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { firebaseConfig } from './config'

import './index.css'

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
    <AppContextProvider value={{firestore: {db}}}>
        <App />
    </AppContextProvider>
)

reportWebVitals()
