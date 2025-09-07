const express = require("express");
const mwLogger = require("./middleware/logger");
const weatherRoutes = require("./routes/weatherRoutes");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(mwLogger);
app.use(weatherRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});