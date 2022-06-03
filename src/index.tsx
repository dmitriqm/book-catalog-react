import React from "react"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { createRoot } from "react-dom/client"

import { Provider } from "react-redux"

import { store } from "./store/store"
import "./index.css"

const container = document.getElementById("root")!
const root = createRoot(container)

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

reportWebVitals()
