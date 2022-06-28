// blueprint for the way webpack should behave within our project
// webpack uses Node.js to build the application so we can use npm modules and the require modules
const path = require("path");

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
    mode: 'development' 
};