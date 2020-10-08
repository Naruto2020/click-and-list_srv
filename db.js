const mongoose = require("mongoose");
const MONGODB_URI =
  "mongodb+srv://steve:Kmia@0703@cluster0.d3ima.mongodb.net/course?retryWrites=true&w=majority";
mongoose.connect(
  MONGODB_URI || "mongodb://localhost:27017/course",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (err) {
    if (err) {
      console.log(
        "erreur de connexion avec la bd:" + JSON.stringify(err, undefined, 2)
      );
    } else {
      console.log("connecter avec succes a mongodb!...");
    }
  }
);
mongoose.connection.on("connected", () => {
  console.log("mongoose est connecté !");
});
module.exports = mongoose;
