module.exports = {
  experimental: {
    serverActions: true,
  },
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.node$/,

        use: [
          {
            loader: "node-loader",
          },
        ],
      }
    );
    config.resolve.alias.canvas = false
    config.resolve.alias.encoding = false
    return config;
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
};
