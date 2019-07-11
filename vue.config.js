const os = require("os");
const path = require("path");

let buildConfig = {
    publicPath: "",
    productionSourceMap: false,
    outputDir: path.resolve("dist"),
    parallel: os.cpus().length > 1
};

if (process.env.IS_DEMO) {
    buildConfig.outputDir = path.resolve("dist-demo");
    buildConfig.chainWebpack = config => {
        config.plugin("html").tap(args => {
            args[0].template = path.resolve("demo/index.html");
            return args;
        });
    };
}

module.exports = buildConfig;
