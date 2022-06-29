// blueprint for the way webpack should behave within our project
// webpack uses Node.js to build the application so we can use npm modules and the require modules
const path = require("path");
// because the plugin is built into webpack, we need to be sure we're bringing webpack's methods and properties into the config file
const webpack = require("webpack");

// create the main configuration object within the file; this is where we will write options within the object that will tell webpack what to do
// for a basic configuration we need to provide webpack with three properties: entry, output, and mode

// declare entry property; the root of the bundle and the beginning of the dependency graph
// webpack will take that entry point, bundle the code, and output it to a folder that we specify; it is common and best practice to put your bundled code into a folder named dist (short for distribution)
// the final piece of the basic setup will provide the mode in which we want webpack to run; by default, webpack wants to run in production mode (but in this mode webpack will minify our code for us automatically along with some other additions so we want our code to run in development mode instead)
module.exports = {
    entry: './assets/js/script.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js'
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
    ],
    mode: 'development'
};

// entry is where the webpack looks to start building the module
// output is used to tell webpack where the files are going to go and what are the names of those files; the first object property for our output is path which is going to have a value of resolve; and resolve gets two arguments -> dirname and a string 'dist' & filename; the location of bundle will be in dist directory
// last property is mode with a value of development; development will offer hot reloading webpack and debugging features; production will build source files into minimized files