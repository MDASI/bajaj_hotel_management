const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://hotelManagement:aK788955@hotel0.0qomj.mongodb.net/?retryWrites=true&w=majority"
);

var dbconnect = mongoose.connection;

dbconnect.on("error", () => {
  console.log(`Mongo DB Connection Failed`);
});

dbconnect.on("connected", () => {
  console.log(`Mongo DB Connection Successfull`);
});

module.exports = mongoose;