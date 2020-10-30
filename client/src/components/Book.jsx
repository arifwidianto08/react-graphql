import React from "react";

export default function Book({ book }) {
  return <li key={book.id}>{book.name}</li>;
}
