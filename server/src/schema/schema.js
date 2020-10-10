const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
} = graphql;

// Dummy Data
const books = [
  {
    id: '1',
    name: 'Eloquent JavaScript, Second Edition',
    authorId: '1',
    genre: 'Programming',
  },
  {
    id: '2',
    name: 'Learning JavaScript Design Patterns',
    authorId: '2',
    genre: 'Design',
  },
  {
    id: '3',
    name: 'Speaking JavaScript',
    authorId: '3',
    genre: 'Self-Improvement',
  },
  {
    id: '4',
    name: 'Programming JavaScript Applications',
    authorId: '4',
    genre: 'Science',
  },
  {
    id: '5',
    name: 'Understanding ECMAScript 6',
    authorId: '5',
    genre: 'Philosophy',
  },
  {
    id: '6',
    name: "You Don't Know JS",
    authorId: '6',
    genre: 'Encyclopedia',
  },
  {
    id: '7',
    name: 'Git Pocket Guide',
    authorId: '7',
    genre: 'Encyclopedia',
  },
];

const authors = [
  { id: '1', name: 'Marijn Haverbeke', age: 30 },
  { id: '2', name: 'Addy Osmani', age: 40 },
  { id: '3', name: 'Axel Rauschmayer', age: 50 },
  { id: '4', name: 'Eric Elliott', age: 60 },
  { id: '5', name: 'Nicholas C. Zakas', age: 70 },
  { id: '6', name: 'Kyle Simpson', age: 80 },
  { id: '7', name: 'Richard E. Silverman', age: 90 },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent) {
        console.log('parent : ', parent);

        return authors.find((a) => a.id === parent.authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        console.log('parent : ', parent);
        console.log('args : ', args);

        return books.find((b) => b.id === args.id);
      },
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(_parent, args) {
        return authors.find((a) => a.id === args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
