import { gql } from "apollo-server-express";

export const typeDefs = gql`
  scalar Date

  type Todo {
    id: ID
    title: String
    detail: String
    date: Date
  }

  type Query {
    welcome: String
    # get all todo
    getTodos: [Todo]

    # get single todo
    getTodo(id: ID): Todo
  }

  # add todos
  type Mutation {
    addTodo(title: String, detail: String, date: Date): Todo
    deleteTodo(id: ID): String
  }
`;
