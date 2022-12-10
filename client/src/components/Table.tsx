import React from "react";
import {GET_TODOS} from "../graphql/Query";
import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import { DELETE_TODO } from "../graphql/Mutation";
import Link from "next/link";

const Table = () => {
  const [deleteTodo] = useMutation(DELETE_TODO);

  const removeTodo = async (id: any) => {
    deleteTodo({
      variables: {
        id: id,
      },
      refetchQueries: [{ query: GET_TODOS }],
    });
  };

  const { loading, error, data } = useQuery(GET_TODOS);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <table className="table table-hover mt-5 w-75 ">
      <thead>
        <tr>
          <th scope="col">S.N</th>
          <th scope="col">Title</th>
          <th scope="col">Detail</th>
          <th scope="col">Date</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.getTodos &&
          data.getTodos.map((todo: any, index: any) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{todo.title}</td>
              <td>{todo.detail}</td>
              <td className="small">{moment(todo.date).format("MMM D YYYY")}</td>
              <td className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-sm rounded-0 btn-info px-3 fw-semibold">
                  view
                </button>
                <Link href={`/todo/${todo.id}`}>
                  <button
                    type="button"
                    className="btn btn-sm rounded-0 btn-warning px-3 fw-semibold">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => removeTodo(todo.id)}
                  type="button"
                  className="btn btn-sm rounded-0 btn-danger fw-semibold">
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
