import React from "react";
import ReactDOMClient from 'react-dom/client';
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const root = ReactDOMClient.createRoot(document.getElementById("root"));
root.render(<App />);

serviceWorker.unregister();