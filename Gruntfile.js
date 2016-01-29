module.exports = function(grunt) {
    require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);
    var webpack = require("webpack");
    var fs = require('fs');
    var path = require("path");
    var colors = require('colors');
    var webpackConfig = require("./webpack.config.js");
    var webpackDevServer = require("webpack-dev-server");
    var port = 8120
    var buildTime = function() {
        var timestamp = new Date().getTime()
        fs.writeFileSync(path.join(__dirname, 'CERT'), '{"lastmodified":"' + timestamp + '"}');
        console.log(colors.green.underline('Timestamp:' + timestamp))
    }
    var publicPath = './myProgram/App/';
    grunt.initConfig({
        copy: {
            dist: {
                expand: true,
                cwd: publicPath,
                src: '**/*.css',
                dest: './public/',
                flatten: false,
                filter: 'isFile'
            }
        },
        clean: {
            normal: {
                src: 'public'
            }
        },
        webpack: {
			options: webpackConfig,
			build: {
				plugins: webpackConfig.plugins.concat(
                    new webpack.DefinePlugin({
                      '__DEV__': true,
                      '__TEST__': false,
                      '__PROD__': false,
                      "process.env": {
                            // This has effect on the react lib size
                            "NODE_ENV": JSON.stringify("production")
                        }
                    }),
                    new webpack.ProvidePlugin({
                        "$": "npm-zepto",
                        "Zepto" : "npm-zepto",
                        "_": "underscore",
                        "FastClick": "fastclick",
                        "jQuery": 'jquery',
                        "Daze":path.join(__dirname,'myProgram/App/js/libs_native/daze')
                    }),
					new webpack.optimize.DedupePlugin(),
					new webpack.optimize.UglifyJsPlugin()
				)
			},
			"build-dev": {
				devtool: "sourcemap",
				debug: true
			}
		},
        watch: {
            app: {
                files: [publicPath + "**/*"],
                tasks: ["webpack:build","webpack-dev-server:start"],
                options: {
                    spawn: false,
                }
            }
        },
        "webpack-dev-server": {
			options: {
				webpack: webpackConfig,
				publicPath: "./public/"
			},
			start: {
				keepAlive: true,
				webpack: {
					devtool: "eval",
					debug: true
				}
			}
		},
        usemin: {
            html: ['public/*.html'],
            options: { //替换静态文件引地址前缀
                filePrefixer: function(url) {
                    if (!url) {
                        return '';
                    }
                    return url.replace('bundle', 'bundle'+webpackConfig.version);
                }
            }
        }

    });

    grunt.registerTask("default", ["clean", "copy","webpack:build","webpack-dev-server:start","watch"]);
};
