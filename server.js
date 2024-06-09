const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:3000" // To allow client to access BE
}));
app.use(express.json());

// Register routes
const issuesApi = require("./api/issues");
app.use("/api/issues", issuesApi);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
  
module.exports = app;