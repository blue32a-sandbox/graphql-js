/**
 * 1. Open up http://localhost:4000/graphql
 * 2. Open a developer console, and paste
 */

// hello
fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  body: JSON.stringify({ query: '{ hello }' }),
})
  .then(r => r.json())
  .then(data => console.log('data returned:', data));

// roll dice
fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  body: JSON.stringify({
    query: `query RollDice($dice: Int!, $sides: Int) {
      rollDice(numDice: $dice, numSides: $sides)
    }`,
    variables: { dice: 3, sides: 6 },
  }),
})
  .then(r => r.json())
  .then(data => console.log("data returned:", data));
