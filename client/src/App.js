import React from "react";
import AddBook from "./components/AddBook";
import BookList from "./containers/BookList";
import { Grommet } from "grommet";
function App() {
  return (
    <Grommet plain>
      <div id="main">
        <h1>My Reading List</h1>
        <BookList />
        <AddBook />
      </div>
    </Grommet>
  );
}

export default App;
