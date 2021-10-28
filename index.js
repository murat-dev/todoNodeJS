const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const colorRoutes = require("./routes/color-routes");
const listRoutes = require("./routes/list-routes");
const taskRoutes = require("./routes/task-routes");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api", colorRoutes.routes);
app.use("/api", listRoutes.routes);
app.use("/api", taskRoutes.routes);

app.listen(PORT, () =>
  console.log("App is listening on url http://localhost:" + PORT)
);
