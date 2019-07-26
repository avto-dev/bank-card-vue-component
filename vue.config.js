const os = require("os");
const path = require("path");

const outputDir = path.resolve(process.env.IS_DEMO ? "dist-demo" : "dist");
const packageJson = require("./package");

const BANK_CARD_VUE_COMPONENT_VERSION = packageJson.version;
const DEFAULT_BANK_CARD_VUE_COMPONENT_IMAGES_BASE_PATH = `//cdn.jsdelivr.net/gh/avto-dev/bank-card-vue-component@${BANK_CARD_VUE_COMPONENT_VERSION}/public/images/`;

let buildConfig = {
    publicPath: "",
    productionSourceMap: false,
    outputDir: outputDir,
    parallel: os.cpus().length > 1,
    chainWebpack: config => {
        if (process.env.IS_DEMO) {
            // If building demo app we need to change index.html template
            config.plugin("html").tap(args => {
                args[0].template = path.resolve("demo/index.html");
                return args;
            });
        }
        // Copy images from ./public to ./dist and ./dist-demo
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
        // Defining env variables
        config.plugin("define").tap(definitions => {
            definitions[0]["process.env"] = Object.assign(
                definitions[0]["process.env"],
                {
                    BANK_CARD_VUE_COMPONENT_IMAGES_BASE_PATH:
                        process.env.BANK_CARD_VUE_COMPONENT_IMAGES_BASE_PATH ||
                        `"${DEFAULT_BANK_CARD_VUE_COMPONENT_IMAGES_BASE_PATH}"`,
                    BANK_CARD_VUE_COMPONENT_VERSION: `"${BANK_CARD_VUE_COMPONENT_VERSION}"`
                }
            );
            return definitions;
        });
    }
};

module.exports = buildConfig;
