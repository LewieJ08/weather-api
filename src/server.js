const express = require("express");
const mwLogger = require("./middleware/logger");

require("dotenv").config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(mwLogger);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});