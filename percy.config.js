const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  includeFiles: [
    './app/css/main.css'
  ],
  webpack: {
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            filename: '[name].js',
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: function() {
                    return [
                      require('postcss-import')(),
                      require('postcss-cssnext')({ features: { rem: false } }),
                      require('postcss-easings')(),
                      require('postcss-browser-reporter')(),
                      require('postcss-reporter')()
                    ];
                  }
                }
              }
            ]
          })
        },
        {
          test: /\.mdx$/i,
          use: [
          { loader: 'babel-loader' },
          { loader: 'markdown-component-loader', options: { passElementProps: true } }
          ]
        },
        {
          test: /\.(woff)$/i,
          use: [
          { loader: 'url-loader', options: { limit: 8192 } }
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/i,
          use: [
          { loader: 'url-loader', options: { limit: 8192 } },
            {
              loader: 'image-webpack-loader',
              options: {
                optipng: { optimizationLevel: 7 },
                gifsicle: { interlaced: false }
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].css')
    ]
  }
};
