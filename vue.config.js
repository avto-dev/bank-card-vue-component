module.exports = {
    productionSourceMap: false,
    chainWebpack: config => {
        config.plugin("html").tap(args => {
            if (process.env.DEMO) {
                args[0].template = "./demo/index.html";
            }
            return args;
        });
    }
};
