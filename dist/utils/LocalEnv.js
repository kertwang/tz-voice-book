"use strict";
exports.__esModule = true;
var storageBucket = "";
exports.storageBucket = storageBucket;
if (process.env.storageBucket) {
    exports.storageBucket = storageBucket = process.env.storageBucket.replace("\"", '');
}
