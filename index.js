const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//app set up
const app = express();

//project set up
app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));


require("./Routes/rating.route")(app);
require("./Routes/product.route")(app);

app.listen(1122);