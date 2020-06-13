import webpack from 'webpack';
import merge from 'webpack-merge';
import baseConfig from './webpack.config.base';

import TerserPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

export default merge.smart(baseConfig, {
  devtool: 'source-map',

  mode: 'production',

  module: {
    rules: [
      {
        test: /\.(webp|png|jpe?g|svg)$/i,
        use: [{
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 90
            },
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: [0.9, 1.0],
              speed: 4,
            }
          }
        }]
      }
    ]
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    })
  ],

  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ]
  }
});
