module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: 'build/dist.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
