import { create } from "zustand";
import { TodoItemProps } from "../types";

type State = {
  todoList: TodoItemProps[];
};

type Action = {
  addTodo: (payload: TodoItemProps) => void;
  updateTodo: (payload: TodoItemProps) => void;
  deleteTodo: (id: string) => void;
};

const useTodoListStore = create<State & Action>((set) => ({
  todoList: [
    {
      id: "1",
      status: "todo",
      title: "Checking",
      description: "Checking at 11 AM",
    },
    {
      id: "2",
      status: "completed",
      title: "Handle TimeSheet Calender",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam pariatur reiciendis repellat ullam rem natus placeat commodi fugiat quaerat tempora?",
    },
    {
      id: "2",
      status: "completed",
      title: "Filling some tuplewares on the housewares",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam pariatur reiciendis repellat ullam rem natus placeat commodi fugiat quaerat tempora? Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam pariatur reiciendis repellat ullam rem natus placeat commodi fugiat quaerat tempora?",
    },
  ],
  addTodo: (payload) =>
    set(({ todoList }) => ({ todoList: [...todoList, payload] })),
  updateTodo: (payload) =>
    set(({ todoList }) => {
      const newTodoList = todoList.map((item) => {
        if (item.id === payload.id) {
          return { ...item, ...payload };
        } else {
          return item;
        }
      });

      return { todoList: newTodoList };
    }),
  deleteTodo: (id) =>
    set(({ todoList }) => {
      const newTodoList = todoList.filter((item) => {
        item.id !== id;
      });

      return { todoList: newTodoList };
    }),
}));

export default useTodoListStore;
