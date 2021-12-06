
const utilities = require('./utilities');
const cors = require('cors');
const getRequest = utilities.getRequest;
const generalRequest = utilities.generalRequest;

var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
scalar JSON
  type Query {
    another: JSON
    sebastian: JSON
  }

`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },

  another: ()=>{
    return getRequest('http://localhost:8069/language/current', '');
  },

  sebastian: ()=>{
    const body = {
      user_name: 'juan2',
      fristName: 'juan',
      lastName: 'juan',
      password: '1234'
    };
    return generalRequest('http://localhost:80/user/create_user', "POST", body);
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);

const corsOptions = {
  origin: '*',
  optionsSucessStatus: 200
}

app.use(cors(corsOptions));
console.log('Running a GraphQL API server at http://localhost:4000/graphql');