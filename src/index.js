import React from "react";
import ReactDOM from "react-dom";

import { App } from "./app";

import "./index.css";
import * as serviceWorker from "./serviceWorker";

var schema = require("./schema/testSchema.json");

// const getDraggingStyle = (isDragging, draggableStyle) => ({
// 	// some basic styles to make the items look a bit nicer
// 	userSelect: "none",
// 	// change background colour if dragging
// 	background: isDragging ? "lightgreen" : "white",
// 	// styles we need to apply on draggables
// 	...draggableStyle,
// 	border: "2px solid",
// 	backgroundColor: "white",
// 	color: "black"
// });

ReactDOM.render(
	<App height={700} width={700} onLoadSchema={getNewSchema} />,
	document.getElementById("root")
);

function getNewSchema(complete) {
	setTimeout(function() {
		complete(schema);
	}, 1000);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
