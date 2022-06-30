const APP_PREFIX = 'FoodFest-';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

// we can't hardcode an absolute path if we want this to work in development and production, because this page will be hosted at the github.io/projectname subroute; instead, we'll use relative paths
const FILES_TO_CACHE = [
    "./index.html",
    "./events.html",
    "./tickets.html",
    "./schedule.html",
    "./assets/css/style.css",
    "./assets/css/bootstrap.css",
    "./assets/css/tickets.css",
    "./dist/app.bundle.js",
    "./dist/events.bundle.js",
    "./dist/tickets.bundle.js",
    "./dist/schedule.bundle.js"
];

// set up event listeners to install service worker, adding files to the precache, so that the application can use the cache
// service workers run before the window object has even been created so we can't use window.addEventListener
self.addEventListener('install', function (e) {
    // we use e.waitUntil to tell the browser to wait until the work is complete before terminating the service worker
    e.waitUntil(
        // we use caches.open to find the specific cache by name, then add every file in the FILES_TO_CACHE array to the cache
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('installing cache : ' + CACHE_NAME)
            return cache.addAll(FILES_TO_CACHE)
        })
    )
})

self.addEventListener('activate', function (e) {
    e.waitUntil(
        // .keys() returns an array of all cache names, which we're calling keyList
        // keyList is a parameter that contains all cache names under <username>.github.io
        caches.keys().then(function (keyList) {
            // filter out caches that have the app prefix (stored in APP_PREFIX) and save them to an array called cacheKeeplist using the .filter() method
            let cacheKeeplist = keyList.filter(function (key) {
                return key.indexOf(APP_PREFIX);
            });
            cacheKeeplist.push(CACHE_NAME);

            return Promise.all(
                keyList.map(function (key, i) {
                    if (cacheKeeplist.indexOf(key) === -1) {
                        console.log('deleting cache : ' + keyList[i]);
                        return caches.delete(keyList[i]);
                    }
                })
            );
        })
    );
});