let express = require("express");
let app = express();
let port = process.env.port || 3000;
let router = express.Router();
app.use("/api/citizens", router);
app.listen(port, () => {
    console.log("Listening on port " + port);
});

