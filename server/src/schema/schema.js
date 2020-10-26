const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

const BookModel = require("../models/book");
const AuthorModel = require("../models/author");

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      async resolve(parent) {
        const author = await AuthorModel.findById(parent.authorId);
        return {
          id: author._id.toHexString(),
          name: author.name,
          age: author.age,
        };
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      async resolve(parent) {
        const authorBooks = await BookModel.find({ authorId: parent.id });

        return authorBooks;
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(_parent, args) {
        const book = await BookModel.findById(args.id);
        return book;
      },
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(_parent, args) {
        const author = await AuthorModel.findById(args.id);
        return author;
      },
    },
    books: {
      type: new GraphQLList(BookType),
      async resolve() {
        const books = await BookModel.find();
        return books;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      async resolve() {
        const authors = await AuthorModel.find();
        return authors.map((ath) => ({
          id: ath._id.toHexString(),
          name: ath.name,
          age: ath.age,
        }));
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(_parent, args) {
        const authorToInsert = new AuthorModel();

        authorToInsert.name = args.name;
        authorToInsert.age = args.age;

        return authorToInsert.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      resolve(parent, args) {
        const bookToInsert = new BookModel();
        bookToInsert.name = args.name;
        bookToInsert.genre = args.genre;
        bookToInsert.authorId = args.authorId;

        return bookToInsert.save();
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
