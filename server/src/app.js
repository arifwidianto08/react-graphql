const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
    pretty: true,
  })
);

app.listen(PORT, () => {
  console.info('This app is now listening for request on port ' + PORT);
});
