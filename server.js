const mongoose = require("mongoose");
const app = require('./app')

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})
const {DB_HOST} = process.env;

mongoose.connect(DB_HOST)
.then(() => console.log("Database connection successful"))
.catch( error => console.log(error.message));