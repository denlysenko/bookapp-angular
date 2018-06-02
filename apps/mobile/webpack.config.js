const { relative, resolve, join } = require('path');

const webpack = require('webpack');
const nsWebpack = require('nativescript-dev-webpack');
const nativescriptTarget = require('nativescript-dev-webpack/nativescript-target');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const {
  NativeScriptWorkerPlugin
} = require('nativescript-worker-loader/NativeScriptWorkerPlugin');

const os = require('os');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

module.exports = env => {
  const platform = env && ((env.android && 'android') || (env.ios && 'ios'));
  if (!platform) {
    throw new Error('You need to provide a target platform!');
  }

  const platforms = ['ios', 'android'];
  const projectRoot = __dirname;
  nsWebpack.loadAdditionalPlugins({ projectDir: projectRoot });

  // Default destination inside platforms/<platform>/...
  const dist = resolve(
    projectRoot,
    nsWebpack.getAppPath(platform, projectRoot)
  );
  const appResourcesPlatformDir = platform === 'android' ? 'Android' : 'iOS';

  const {
    // The 'appPath' and 'appResourcesPath' values are fetched from
    // the nsconfig.json configuration file
    // when bundling with `tns run android|ios --bundle`.
    appPath = 'app',
    appResourcesPath = 'app/App_Resources',

    // Aot, snapshot, uglify and report can be enabled by providing
    // the `--env.snapshot`, `--env.uglify` or `--env.report` flags
    // when running 'tns run android|ios'
    aot,
    snapshot,
    uglify,
    report
  } = env;
  const ngToolsWebpackOptions = {
    tsConfigPath: join(__dirname, 'tsconfig.aot.json')
  };

  const appFullPath = resolve(projectRoot, appPath);
  const appResourcesFullPath = resolve(projectRoot, appResourcesPath);

  const config = {
    context: appFullPath,
    watchOptions: {
      ignored: [
        appResourcesFullPath,
        // Don't watch hidden files
        '**/.*'
      ]
    },
    target: nativescriptTarget,
    entry: {
      bundle: aot
        ? `./${nsWebpack.getAotEntryModule(appFullPath)}`
        : `./${nsWebpack.getEntryModule(appFullPath)}`,
      vendor: './vendor'
    },
    output: {
      pathinfo: true,
      path: dist,
      libraryTarget: 'commonjs2',
      filename: '[name].js'
    },
    resolve: {
      extensions: ['.ts', '.js', '.scss', '.css'],
      // Resolve {N} system modules from tns-core-modules
      modules: [
        resolve(__dirname, 'node_modules/tns-core-modules'),
        resolve(__dirname, 'node_modules'),
        'node_modules/tns-core-modules',
        'node_modules'
      ],
      alias: {
        '~': appFullPath
      }
      // symlinks: false
    },
    resolveLoader: {
      symlinks: false
    },
    node: {
      // Disable node shims that conflict with NativeScript
      http: false,
      timers: false,
      setImmediate: false,
      fs: 'empty'
    },
    module: {
      rules: [
        { test: /\.html$|\.xml$/, use: 'raw-loader' },

        // tns-core-modules reads the app.css and its imports using css-loader
        {
          test: /[\/|\\]app\.css$/,
          use: {
            loader: 'css-loader',
            options: { minimize: false, url: false }
          }
        },
        {
          test: /[\/|\\]app\.scss$/,
          use: [
            { loader: 'css-loader', options: { minimize: false, url: false } },
            'sass-loader'
          ]
        },

        // Angular components reference css files and their imports using raw-loader
        { test: /\.css$/, exclude: /[\/|\\]app\.css$/, use: 'raw-loader' },
        {
          test: /\.scss$/,
          exclude: /[\/|\\]app\.scss$/,
          use: ['raw-loader', 'resolve-url-loader', 'sass-loader']
        },

        // Compile TypeScript files with ahead-of-time compiler.
        {
          test: /.ts$/,
          use: [
            'nativescript-dev-webpack/moduleid-compat-loader',
            { loader: '@ngtools/webpack', options: ngToolsWebpackOptions }
          ]
        },
        { test: /\.json$/, use: [{ loader: 'json-loader' }] }
      ]
    },
    plugins: [
      // Vendor libs go to the vendor.js chunk
      new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor']
      }),
      // Define useful constants like TNS_WEBPACK
      new webpack.DefinePlugin({
        'global.TNS_WEBPACK': 'true'
      }),
      // Remove all files from the out dir.
      new CleanWebpackPlugin([`${dist}/**/*`]),
      // Copy native app resources to out dir.
      new CopyWebpackPlugin([
        {
          from: `${appResourcesFullPath}/${appResourcesPlatformDir}`,
          to: `${dist}/App_Resources/${appResourcesPlatformDir}`,
          context: projectRoot
        }
      ]),
      // Copy assets to out dir. Add your own globs as needed.
      new CopyWebpackPlugin(
        [
          { from: 'assets/**' },
          { from: 'fonts/**' },
          { from: '**/*.jpg' },
          { from: '**/*.png' },
          { from: '**/*.xml' }
        ],
        {
          ignore: [
            `${relative(appPath, appResourcesFullPath)}/**`,
            'assets/json/**'
          ]
        }
      ),
      // Generate a bundle starter script and activate it in package.json
      new nsWebpack.GenerateBundleStarterPlugin(['./vendor', './bundle']),
      // Support for web workers since v3.2
      new NativeScriptWorkerPlugin(),
      // AngularCompilerPlugin with augmented NativeScript filesystem to handle platform specific resource resolution.
      new nsWebpack.NativeScriptAngularCompilerPlugin(
        Object.assign(
          {
            entryModule: resolve(appPath, 'app.module#AppModule'),
            skipCodeGeneration: !aot,
            platformOptions: {
              platform,
              platforms
              // ignore: ['App_Resources']
            }
          },
          ngToolsWebpackOptions
        )
      ),
      // Does IPC communication with the {N} CLI to notify events when running in watch mode.
      new nsWebpack.WatchStateLoggerPlugin()
    ]
  };
  if (report) {
    // Generate report files for bundles content
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        generateStatsFile: true,
        reportFilename: resolve(projectRoot, 'report', `report.html`),
        statsFilename: resolve(projectRoot, 'report', `stats.json`)
      })
    );
  }
  if (snapshot) {
    config.plugins.push(
      new nsWebpack.NativeScriptSnapshotPlugin({
        chunk: 'vendor',
        projectRoot,
        webpackConfig: config,
        targetArchs: ['arm', 'arm64', 'ia32'],
        tnsJavaClassesOptions: { packages: ['tns-core-modules'] },
        useLibs: false
      })
    );
  }
  if (uglify) {
    config.plugins.push(
      new ParallelUglifyPlugin({
        workerCount: os.cpus().length,
        uglifyES: {
          // compress: platform !== 'android',
          compress: {
            collapse_vars: platform !== 'android', // for asbg
            drop_console: true,
            drop_debugger: true,
            ecma: 6,
            keep_infinity: platform === 'android', // for Chrome/V8
            passes: 1,
            reduce_funcs: platform !== 'android', // for Chrome/V8
            reduce_vars: platform !== 'android', // for asbg
            sequences: platform !== 'android', // for asbg
            pure_funcs: [
              'this._log.debug',
              'this._log.error',
              'this._log.info',
              'this._log.warn'
            ]
          },
          ecma: 6,
          safari10: platform !== 'android',
          warnings: 'verbose'
        }
      })
    );
  }
  return config;
};
