const path = require("path");
const env = process.env.NODE_ENV;

// Todo: Fill with appropriate ones (minify, uglify) depending
// on value of 'env'. Then consume.
var plugins = [],
	mode = env === "production" ? "production" : "development";

module.exports = {
	// Entry point to our code. This index.js (or other-name)
	// file/module should export the MicroscropyApp Component
	mode: mode,
	entry: "./src/index.js", 
	output: {
		library: "MicroscopyTool",
		libraryTarget: "umd",
		// I think this 'library' & 'libraryTarget' setting(s), at least in earlier version of webpack,
		// should make the "MicroscopyApp" component,
		// or whatever component is exported from "./src/index.js" (or other file),
		// globally available in browser context (via attaching it to global window object),
		// e.g. accessible from aforementioned index.html page / script.
		path: path.resolve("./dist"),
		filename: "microscopeApp.js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			}
		]
	},
	externals: {
		// Things which we don't transpile and expect user of library/component to have or provide.
		"react" : {
			"commonjs": "react",
			"commonjs2" : "react",
			"amd" : "react",
			"root" : "React"
		},
		"react-dom" : {
			"commonjs": "react-dom",
			"commonjs2" : "react-dom",
			"amd" : "react-dom",
			"root" : "ReactDOM"
		}
	}
};
