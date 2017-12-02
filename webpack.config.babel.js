import { join } from 'path';

const include = join(__dirname, 'src');

export default {
  entry: ['babel-polyfill', './index'],
  output: {
    path: join(__dirname, 'examples/dist'),
    libraryTarget: 'umd',
    library: 'SpotifyWrapper',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', include },
    ],
  },
};
