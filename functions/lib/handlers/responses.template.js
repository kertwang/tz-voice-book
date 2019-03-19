"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template = `
<!DOCTYPE HTML>
<html>
<head>
  https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css
  // <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  // <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css">
  // <script defer src="https://code.getmdl.io/1.3.0/material.min.js"></script>
</head>
<body>
<h2>Summary of chatbot responses</h2>

{{#intents}}
  <h4>Q: {{question}}</h4>
  <span>Responses:</span>
  <ul>
    {{#responses}}
      <li>{{.}}</li>
    {{/responses}}
  </ul>
{{/intents}}
</body>
</html>
`;
exports.default = template;
