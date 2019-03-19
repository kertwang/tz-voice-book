"use strict";
exports.__esModule = true;
var template = "\n<!DOCTYPE HTML>\n<html>\n<head>\n  https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css\n  // <link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/icon?family=Material+Icons\">\n  // <link rel=\"stylesheet\" href=\"https://code.getmdl.io/1.3.0/material.indigo-pink.min.css\">\n  // <script defer src=\"https://code.getmdl.io/1.3.0/material.min.js\"></script>\n</head>\n<body>\n<h2>Summary of chatbot responses</h2>\n\n{{#intents}}\n  <h4>Q: {{question}}</h4>\n  <span>Responses:</span>\n  <ul>\n    {{#responses}}\n      <li>{{.}}</li>\n    {{/responses}}\n  </ul>\n{{/intents}}\n</body>\n</html>\n";
exports["default"] = template;
