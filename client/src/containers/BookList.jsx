import React from "react";
import Book from "../components/Book";
import { useQuery } from "react-apollo";
import { GET_BOOKS } from "../queries";

export default function BookList() {
  const { loading, error, data = { books: [] } } = useQuery(GET_BOOKS);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;
  return (
    <div>
      <ul id="book-list">
        {data.books.map((book) => {
          return <Book key={book.id} book={book} />;
        })}
      </ul>
    </div>
  );
}
