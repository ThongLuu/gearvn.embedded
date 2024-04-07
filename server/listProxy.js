const backendUrl = process.env.BACKEND_HOST;
console.log("backendUrl", backendUrl);

module.exports = {
  "/v1/api": {
    target: backendUrl,
    changeOrigin: true,
    logLevel: "debug",
    pathRewrite: {
      "^/v1/api": "",
    },
  },
};
