import React from "react";
import ReactDOM from "react-dom/client";
import { MenuApp } from "./MenuApp";
import { BrowserRouter } from "react-router-dom";

//import './style.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MenuApp/>
    </BrowserRouter>
  </React.StrictMode>
);
