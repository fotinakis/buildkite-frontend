const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  includeFiles: [
    './app/css/main.css',
    // './app/css/animations.css',
    // './app/css/annotation-body.css',
    // './app/css/backdrop.css',
    // './app/css/background-colors.css',
    // './app/css/background-hover-colors.css',
    // './app/css/backgrounds.css',
    // './app/css/border-colors.css',
    // './app/css/btn-outline.css',
    // './app/css/btn-primary.css',
    // './app/css/btn.css',
    // './app/css/checkbox.css',
    // './app/css/codemirror-additions.css',
    // './app/css/colors.css',
    // './app/css/container.css',
    // './app/css/cursor.css',
    // './app/css/display.css',
    './app/css/emoji.css',
    // './app/css/focus-colors.css',
    // './app/css/font-weights.css',
    // './app/css/fonts.css',
    // './app/css/hover-colors.css',
    './app/css/hover-fading.css',
    './app/css/hover-underline.css',
    './app/css/icons.css',
    // './app/css/index.js',
    // './app/css/input.css',
    './app/css/interaction-events.css',
    './app/css/letter-spacing.css',
    './app/css/outline.css',
    './app/css/public.css',
    './app/css/radio.css',
    './app/css/reset.css',
    './app/css/rounded.css',
    // './app/css/select.css',
    './app/css/shadows.css',
    './app/css/style-guide',
    // './app/css/svg-colors.css',
    // './app/css/text.css',
    './app/css/transitions.css'
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
