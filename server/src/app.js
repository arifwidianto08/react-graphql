const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB Atlas Database

mongoose.connect(
  "mongodb+srv://arif:1234567890@cluster0.6fdc8.mongodb.net/react_graphql?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.connection.once("open", () => {
  console.log("Connected to Database");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
    pretty: true,
  })
);

app.listen(PORT, () => {
  console.info("This app is now listening for request on port " + PORT);
});
