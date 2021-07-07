module.exports = function (api) {
	api.cache(true);
	return {
		presets: [
			["@babel/preset-env", { "modules": false }],
			"@babel/preset-react"
		],
		plugins: [
			"@babel/plugin-syntax-dynamic-import",
			"@babel/plugin-proposal-object-rest-spread",
			"@babel/plugin-proposal-class-properties"
		],
		comments: true
	};
};
