const path = require("path");

module.exports = {
  // webpack(config) {
  //   config.module.rules.push({
  //     exclude: [/node_modules\/(?!(swiper|dom7)\/).*/, /\.test\.js(x)?$/],
  //     test: /\.js(x)?$/,
  //     use: [{ loader: "babel-loader" }],
  //   });
  //   return config;
  // },

  // webpack(config, { isServer }) {
  //   if (!isServer) {
  //     config.resolve.fallback.fs = false;
  //   }
  //   return config;
  // },

  images: {
    domains: ["cdn.sanity.io"],
    // loader: "custom",
  },

  sassOptions: {
    includePaths: [path.join(__dirname, "styles/")],
    prependData: `
    @import 'colors.scss';
    @import 'mixins.scss';
    @import 'variables.scss';
    `,
  },
};
