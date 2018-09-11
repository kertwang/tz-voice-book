"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Decorators_1 = require("gulpclass/Decorators");
let gulp = require("gulp");
console.log("gulp", gulp);
let en_us_flows = require('./content/en_us_flows');
// import en_us_flows from './content/en_us_flows';
// import en_us_blocks from './content/en_us_blocks';
// import en_us_messages from './content/en_us_messages';
let Gulpfile = class Gulpfile {
    // @Task()
    // clean(cb: Function) {
    //   return del(["./dist/**"], cb);
    // }
    /**
     * Read the message content from the `./content` dir, and deploy
     * to firebase
     */
    deployContent() {
        console.log("en_us_flows", en_us_flows);
    }
};
__decorate([
    Decorators_1.Task()
], Gulpfile.prototype, "deployContent", null);
Gulpfile = __decorate([
    Decorators_1.Gulpclass()
], Gulpfile);
exports.Gulpfile = Gulpfile;
//# sourceMappingURL=index.js.map