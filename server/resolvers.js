import Todo from "./models/Todo.js";

export const resolvers = {
  Query: {
    welcome: () => {
      return "Welcome to resolvers";
    },

    // all todo
    getTodos: async () => {
      const todos = await Todo.find();
      return todos;
    },

    // single todo
    getTodo: async (root, args) => {
      const todo = await Todo.findById(args.id);
      return todo;
    },
  },

  Mutation: {
    addTodo: async (root, args) => {
      const newTodo = new Todo({ title: args.title, detail: args.detail, date: args.date });
      await newTodo.save();
      return newTodo;
    },

    // delete todo
    deleteTodo: async (root, args) => {
      await Todo.findByIdAndDelete(args.id);
      return "Todo deleted successfully";
    },
  },
};
