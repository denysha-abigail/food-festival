// blueprint for the way webpack should behave within our project
// webpack uses Node.js to build the application so we can use npm modules and the require modules
const path = require("path");
// because the plugin is built into webpack, we need to be sure we're bringing webpack's methods and properties into the config file
const webpack = require("webpack");
// plugin that will analyze our bundle sizes to see how much JavaScript is being processed by the browser.
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const WebpackPwaManifest = require("webpack-pwa-manifest");

// create the main configuration object within the file; this is where we will write options within the object that will tell webpack what to do
// for a basic configuration we need to provide webpack with three properties: entry, output, and mode

// declare entry property; the root of the bundle and the beginning of the dependency graph
// webpack will take that entry point, bundle the code, and output it to a folder that we specify; it is common and best practice to put your bundled code into a folder named dist (short for distribution)
// the final piece of the basic setup will provide the mode in which we want webpack to run; by default, webpack wants to run in production mode (but in this mode webpack will minify our code for us automatically along with some other additions so we want our code to run in development mode instead)
module.exports = {
    entry: {
        app: "./assets/js/script.js",
        events: "./assets/js/events.js",
        schedule: "./assets/js/schedule.js",
        tickets: "./assets/js/tickets.js"
    },
    output: {
        // the name of each attribute in the entry object will be used in place of [name] in each bundle.js file that is created
        // the bundle file for script.js will be app.bundle.js, the bundle file for events.js will be events.bundle.js, and so on, with each using the key name from each key-value pair in the object for [name]
        filename: "[name].bundle.js",
        // output bundle files will be written to the dist folder
        path: __dirname + "/dist",
    },
    // while loaders are configured in the module property of the webpack configuration object, plugins are configured in the plugins array
    module: {
        // added an object to the rules array that will identify the type of files to pre-process using the test property to find a regular expression, or regex
        // we are trying to process any image file with the file extension of .jpg
        // we could expand this expression to also search for other image file extensions such as .png, .svg, or .gif
        // recall that regular expressions are a type of code used to search for character patterns in strings, much like how we use the word search in VS Code
        rules: [
            {
                test: /\.jpg$/i,
                // use is where the actual loader is implemented
                use: [
                    {
                        loader: "file-loader",
                        // we added an options object below the loader assignment that contains a name function, which returns the name of the file with the file extension
                        options: {
                            esModule: false,
                            name(file) {
                                return "[path][name].[ext]"
                            },
                            // the publicPath property is a function that changes our assignment URL by replacing the ../ from our require() statement with /assets/
                            publicPath: function (url) {
                                return url.replace("../", "/assets/")
                            }
                        }
                    },
                    {
                        // optimizes the emitted files
                        loader: 'image-webpack-loader'
                    }
                ]
            }
        ]
    },
    // if we want webpack to now use the jQuery package, we need to use a plugin to let webpack know
    // plugins play an important role in directing webpack what to do
    plugins: [
        // use the providePlugin plugin to define the $ and jQuery variables to use the installed npm package
        // if we did not do this, the code would still not work even though we installed jQuery
        // whenever you work with libraries that are dependent on the use of a global variable, just like jQuery is with $ and jQuery, you must tell webpack to make exceptions for these variables by using webpack.ProvidePlugin
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new BundleAnalyzerPlugin({
            // the report outputs to an HTML file in the dist folder
            // this will output an HTML file called report.html that will generate in the dist folder
            // the new plugin will automatically open a report.html in the browser after the build is completed that will create an interactive tree map in the browser
            analyzerMode: "static"
        }),
        // when we use the new keyword, we are invoking a constructor function
        // after we instantiate our new WebpackPwaManifest, we provide an object as our only argument
        new WebpackPwaManifest({
            name: "Food Event",
            short_name: "Foodies",
            description: "An app that allows you to view upcoming food events.",
            // start_url property specifies the homepage for the PWA relative to the location of the manifest file
            start_url: "../index.html",
            background_color: "#01579b",
            theme_color: "#ffffff",
            // fingerprints and inject are both specific to the manifest plugin
            // fingerprints tell webpack whether or not it should generate unique fingerprints so that each time a new manifest is generated, it looks like this: manifest.lhge325d.json
            // because we do not want this feature, we set fingerprints to be false
            fingerprints: false,
            // the inject property determines whether the link to the manifest.json is added to the HTML; because we are not using fingerprints, we can also set inject to be false
            inject: false,
            // icons value will be an array of objects
            // that object contains a src property, which is a path to the icon image we want to use
            // the next property is sizes; the plugin will take the src image, and create icons with the dimensions of the numbers provided as the value of the sizes property
            // the destination property designates where the icons will be sent after the creation of the web manifest is completed by the plugin
            icons: [{
                src: path.resolve("assets/img/icons/icon-512x512.png"),
                sizes: [96, 128, 192, 256, 384, 512],
                destination: path.join("assets", "icons")
            }]
        })
    ],
    mode: 'development'
};

// entry is where the webpack looks to start building the module
// output is used to tell webpack where the files are going to go and what are the names of those files; the first object property for our output is path which is going to have a value of resolve; and resolve gets two arguments -> dirname and a string 'dist' & filename; the location of bundle will be in dist directory
// last property is mode with a value of development; development will offer hot reloading webpack and debugging features; production will build source files into minimized files