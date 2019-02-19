var gulp        = require("gulp"),
	PluginError = require("plugin-error"),
	log         = require("fancy-log"),
	webpack     = require("webpack");


var setProduction = (done) => {
	process.env.NODE_ENV = "production";
	done();
};

var setDev = (done) => {
	process.env.NODE_ENV = "development";
	done();
};

function webpackOnBuild(done) {
	var start = Date.now();
	return function (err, stats) {
		if (err) {
			throw new PluginError("webpack", err);
		}
		log("[webpack]", stats.toString({
			colors: true
		}));
		var end = Date.now();
		log("Build Completed, running for " + ((end - start)/1000)) + "s";
		if (done) { done(err); }
	};
}

var doWebpack = (cb) => {
	var webpackConfig = require("./webpack.config.js");
	webpack(webpackConfig).run(webpackOnBuild(cb));
};

var watch = () => {
	var webpackConfig = require("./webpack.config.js");
	webpack(webpackConfig).watch(300, webpackOnBuild());
};


const devSlow       = gulp.series(setDev, doWebpack, watch);
const build         = gulp.series(setProduction, doWebpack);

gulp.task("dev", devSlow);
gulp.task("build", build);

