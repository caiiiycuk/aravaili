import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import Framework7React from "framework7-react";
import Framework7 from "framework7/framework7-lite.esm.bundle";

import App from "./App";

import "framework7/css/framework7.bundle.min.css";

Framework7.use(Framework7React);
ReactDOM.render(React.createElement(App), document.getElementById("app"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
