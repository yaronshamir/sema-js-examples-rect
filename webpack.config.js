const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const dist = './dist';

module.exports = {
   resolve: {
      alias: {
         item: path.resolve(__dirname, 'src/components/item/item'),
         map: path.resolve(__dirname, 'src/components/map'),
         events: path.resolve(__dirname, 'src/core/events'),
         request: path.resolve(__dirname, 'src/app/request')
      },
      extensions: ['.js']
   },
   devServer: {
      open: true,
      allowedHosts: ['localhost'],
      contentBase: dist,
      watchContentBase: true,
      hot: true,
      port: 8080
   },
   entry: './src/app.js',
   output: {
      filename: 'app.js?t=' + new Date().getTime(),
      path: path.resolve(__dirname, dist)
   },
   node: {
      fs: 'empty'
   },
   module: {
      rules: [{
         test: /\.js$/,
         exclude: /node_modules/
      },
      {
         test: /\.xml$/i,
         use: 'raw-loader'
      }],
   },
   plugins: [
      new CopyPlugin({
         patterns: [{
            from: './src/index.html',
            to: 'index.html',
            toType: 'file'
         },
         {
            from: './src/style/generated.css',
            to: 'style/style.css',
            toType: 'file'
         }]
      })
   ]
};