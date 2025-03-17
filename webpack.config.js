const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');  // Importa el plugin

module.exports = {
  entry: {
    main: './src/js/main.js',  // Archivo principal
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // Configuramos los nombres de los archivos JS con [contenthash]
    filename: 'js/[name].[contenthash].bundle.js',  // Los archivos JS se almacenarán en dist/js/
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          // Configuramos las imágenes con [contenthash]
          filename: 'assets/images/[name].[contenthash][ext]', // Los archivos con hash en la carpeta assets/images
        },
      },
      {
        test: /\.svg$/i,
        type: 'asset/resource',
        generator: {
          // Aquí configuramos que los SVG también tengan un hash en su nombre
          filename: 'assets/svg/[name].[contenthash][ext]', // Los archivos con hash en la carpeta assets/svg
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          // Configuramos las fuentes con [contenthash]
          filename: 'assets/fonts/[name].[contenthash][ext]', // Los archivos con hash en la carpeta assets/fonts
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // En este caso, automáticamente inyectará todos los scripts generados por Webpack
    }),
    new MiniCssExtractPlugin({
      // Configuramos el CSS con [contenthash]
      filename: 'css/[name].[contenthash].css',  // El nombre del archivo CSS generado
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' },  // Copia los assets de src a dist
        { from: 'src/js/', to: 'js/' }, // Copia los archivos JS sin cambios, pero asegúrate de incluir el hash en el nombre
      ],
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    open: true,
    port: 3000,
  },
  mode: 'development',
};
