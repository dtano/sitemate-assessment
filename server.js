const express = require("express");

const app = express();

// Middleware
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
  
module.exports = app;