const babelIgnoreMapboxPlugin = require("./craco-babel-ignore-mapbox");

module.exports = {
    style: {
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    },
    plugins: [
      {
        plugin: babelIgnoreMapboxPlugin
      }
    ]
  }
  