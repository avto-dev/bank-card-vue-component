let buildConfig = {
    productionSourceMap: false
};

if (process.env.DEMO) {
    buildConfig.publicPath = '';
    buildConfig.chainWebpack = config => {
        config.plugin("html").tap(args => {
            args[0].template = "./demo/index.html";
            return args;
        });
    };
}

module.exports = buildConfig;
