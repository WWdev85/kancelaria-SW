
const path = require ('path');
const {CleanWebpackPlugin} = require ('clean-webpack-plugin');
const HtmlWebpackPlugin = require ('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: { 
      main: './src/index.js'
  },
  output: {
      filename: 'js/[name].js',
      path: path.resolve(__dirname, '../', 'dist')
  },




  module: {
    rules: [
      {
         test: /\.txt$/,
         use: 'raw-loader'
      },
      {
        test: /\.css$/,
        use: [ MiniCssExtractPlugin.loader,'css-loader']
    
     },
     {
      test: /\.(sass|scss)$/,
      use: ['style-loader' ,'css-loader','sass-loader']
   },
   {
    test: /\.(jpg|png|svg|gif|jpeg|webp)$/,
    use: 'file-loader'
   },
   {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader"
    }
   } , 

  {
    test: /\.mp4$/,
    loader: 'url-loader?limit=10000&mimetype=video/mp4'
},

   ]
  },

  devServer:{
    open: true,
    contentBase: path.resolve(__dirname, '../')
  },


  plugins: [
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/templates/template.html"
    }),
  
  ]
}