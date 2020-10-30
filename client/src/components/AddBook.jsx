import React, { useState } from "react";
import { useQuery, useMutation } from "react-apollo";
import { TextInput } from "grommet/components/TextInput";
import { Select } from "grommet/components/Select";
import { Form } from "grommet/components/Form";
import { FormField } from "grommet/components/FormField";
import { Button } from "grommet/components/Button";
import { Box } from "grommet/components/Box";
import { GET_AUTHORS, ADD_BOOK } from "../queries";

export default function AddBook() {
  const { loading, error, data = { authors: [] } } = useQuery(GET_AUTHORS);

  const [addBook] = useMutation(ADD_BOOK, {
    onCompleted(data) {
      console.log("data ? : ", data);
    },
  });

  const [newBook, setBook] = useState({
    name: "",
    genre: "",
    authorId: "",
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :( </div>;

  return (
    <Box
      width="100%"
      style={{ position: "fixed", bottom: "35px" }}
      flex
      align="center"
      justify="center"
    >
      <Box width="medium" animation={["fadeIn", "slideDown"]}>
        <Form
          value={newBook}
          onChange={(nextValue) =>
            setBook((prevState) => ({
              ...prevState,
              ...nextValue,
            }))
          }
          onReset={() =>
            setBook({
              name: "",
              genre: "",
              authorId: "",
            })
          }
          onSubmit={({ value }) => {
            addBook({ variables: value });
          }}
        >
          <FormField name="name" htmlfor="text-input-id" label="Name">
            <TextInput name="name" placeholder="e.g. Alice in Wonderland" />{" "}
          </FormField>

          <FormField name="name" htmlfor="text-input-id" label="Genre">
            <TextInput name="genre" placeholder="e.g Sci-Fi" />{" "}
          </FormField>

          <FormField name="name" htmlfor="text-input-id" label="Author">
            <Select
              placeholder="Select author"
              name="authorId"
              labelKey="label"
              valueKey={{ key: "value", reduce: true }}
              options={data.authors.map((author) => ({
                label: author.name,
                value: author.id,
              }))}
            />
          </FormField>
          <Box direction="row" gap="medium">
            <Button type="submit" primary label="Submit" />
            <Button type="reset" label="Reset" />
          </Box>
        </Form>
      </Box>
    </Box>
  );
}
