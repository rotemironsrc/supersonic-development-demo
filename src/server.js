"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
exports.__esModule = true;
var express_1 = require("express");
// dummy for testing
var dummy_1 = require("./dummy");
// Constants
var PORT = 8080;
var HOST = '0.0.0.0';
// App
var app = express_1["default"]();
app.get('/', function (req, res) {
    res.send('Hello remote world!\n');
});
app.listen(PORT, HOST);
console.log("Running on http://" + HOST + ":" + PORT);
console.log("And another line, for testing!");
console.log("the dummy value is " + dummy_1.testTrue);
