const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: ".env" });

mongoose
    .connect(process.env.MONGO_URI)
    .then((con) => {
        console.log("==> Connected to mongo database");
    })
    .catch((conErr) => {
        console.log("==> Failed to connect to mongo database", conErr.toString());
    });

var PORT = 3000 || process.env.PORT;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: "5mb" }));
app.use(bodyParser.json());

app.use("/user", require("./routes/userRoutes"));
app.use("/subject", require("./routes/subjectRoutes"));
app.use("/attendance", require("./routes/attendanceRoutes"));

app.get("/", (req, res) => {
    res.json({
        status: "success",
        message: "The Server is Up",
    });
});

app.listen(PORT, () => console.log("==> SERVER STARTED AT PORT : " + PORT));
