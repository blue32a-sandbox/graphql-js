// https://graphql.org/graphql-js/running-an-express-graphql-server/

const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');
const { buildSchema } = require('graphql');
const { ruruHTML } = require('ruru/server');

const schema = buildSchema(`
  type Query {
    hello: String
    rollDice(numDice: Int!, numSides: Int): [Int]
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
  }
`);

const rootValue = {
  hello: () => {
    return "Hello world!";
  },
  rollDice: ({ numDice, numSides }) => {
    const output = [];
    for (let i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return output;
  },
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
  },
  random: () => {
    return Math.random();
  },
  rollThreeDice: () => {
    return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
  },
};

const app = express();

app.all(
  '/graphql',
  createHandler({
    schema,
    rootValue
  })
);

app.get('/', (_req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/graphql' }));
});

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
