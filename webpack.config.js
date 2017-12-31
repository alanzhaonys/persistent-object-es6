module.exports = {
  entry: __dirname + '/src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index.js',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
    }]
  },
  resolve: {
    extensions: ['.js']
  }
}
