// Dependencies
let express = require("express");
let bodyParser = require("body-parser");
let path = require("path");

// Set up Express app
let app = express();
let PORT = process.env.PORT || 8787;

// All data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Require and set routes
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// Ask server to listen on our port
app.listen(PORT, function() {
  console.log("App listening on http://localhost:" + PORT);
});
