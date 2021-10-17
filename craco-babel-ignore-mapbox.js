// refer: https://docs.mapbox.com/mapbox-gl-js/guides/install/#excluding-mapbox-gl-js-explicitly-from-transpilation

module.exports = {
  overrideWebpackConfig: ({
    webpackConfig,
    cracoConfig,
    pluginOptions,
    context: { env, paths },
  }) => {
    for (let rule of webpackConfig.module.rules) {
      if (typeof rule.oneOf === "object") {
        const plugins = rule.oneOf;

        for (let plugin of plugins) {
        
          if (plugin.loader && plugin.loader.indexOf("babel-loader") >= 0) {
            plugin.options.ignore = [
              "./node_modules/mapbox-gl/dist/mapbox-gl.js",
            ];
          }
        }
      }
    }
    // Always return the config object.

    console.log(JSON.stringify(webpackConfig));
    return webpackConfig;
  },
};
