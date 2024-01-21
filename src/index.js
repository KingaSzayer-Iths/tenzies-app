import React from "react"
import {createRoot} from "react-dom/client"
import App from "./App"
import "./style.css"

// ReactDOM.render(<App />, document.getElementById("root"))

const root=createRoot(document.getElementById("root"))
root.render(<App />)
