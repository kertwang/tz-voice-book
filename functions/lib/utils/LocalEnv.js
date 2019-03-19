"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let storageBucket = "";
exports.storageBucket = storageBucket;
if (process.env.storageBucket) {
    exports.storageBucket = storageBucket = process.env.storageBucket.replace("\"", '');
}
