const os = require("os");
const path = require("path");
const outputDir = path.resolve(process.env.IS_DEMO ? "dist-demo" : "dist");

let buildConfig = {
    publicPath: "",
    productionSourceMap: false,
    outputDir: outputDir,
    parallel: os.cpus().length > 1,
    chainWebpack: config => {
        if (process.env.IS_DEMO) {
            config.plugin("html").tap(args => {
                args[0].template = path.resolve("demo/index.html");
                return args;
            });
        }
        config.plugin("copy").use(require("copy-webpack-plugin"), [
            [
                {
                    from: path.resolve("./public/images"),
                    to: path.resolve(outputDir, "images"),
                    toType: "dir",
                    ignore: [".DS_Store"]
                }
            ]
        ]);
    }
};

module.exports = buildConfig;
