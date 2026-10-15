const path = require('node:path')

module.exports = function (config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine', 'webpack'],

    files: [
      {
        pattern: 'src/tests/index.js',
        watched: false
      }
    ],

    preprocessors: {
      'src/tests/index.js': ['webpack']
    },

    webpack: {
      mode: 'development',

      devtool: 'inline-source-map',

      resolve: {
        extensions: ['.js', '.jsx']
      },

      module: {
        rules: [
          {
            test: /\.jsx?$/,

            include: path.resolve(__dirname, 'src'),

            use: {
              loader: 'babel-loader',

              options: {
                babelrc: false,
                configFile: false,

                presets: [
                  [
                    '@babel/preset-env',
                    {
                      targets: {
                        chrome: '120'
                      }
                    }
                  ],
                  [
                    '@babel/preset-react',
                    {
                      runtime: 'automatic'
                    }
                  ]
                ],

                plugins: [
                  [
                    'istanbul',
                    {
                      exclude: ['src/tests/**']
                    }
                  ]
                ]
              }
            }
          },
          {
            test: /\.css$/,

            use: ['style-loader', 'css-loader']
          },
          {
            test: /\.(png|jpe?g|gif|svg|webp)$/i,

            type: 'asset/resource'
          }
        ]
      },

      performance: {
        hints: false
      }
    },

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      dir: path.resolve(__dirname, 'coverage'),

      reporters: [
        {
          type: 'html',
          subdir: 'html'
        },
        {
          type: 'text-summary'
        },
        {
          type: 'lcovonly',
          subdir: '.'
        }
      ]
    },

    browsers: ['ChromeHeadless'],

    client: {
      jasmine: {
        random: false
      }
    },

    autoWatch: false,

    singleRun: true,

    browserNoActivityTimeout: 60000
  })
}