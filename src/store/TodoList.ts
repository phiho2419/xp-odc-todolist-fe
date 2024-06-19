import { v4 as uuid } from "uuid";
import { create } from "zustand";
import { GetFilterListParam, TodoItemProps, UpdateTodoPayload } from "../types";

type State = {
  todoList: TodoItemProps[];
  filterList: TodoItemProps[];
  todoSelected: null | TodoItemProps;
};

type Action = {
  addTodo: (payload: TodoItemProps) => void;
  updateTodo: (payload: UpdateTodoPayload) => void;
  setTodoSelected: (payload: TodoItemProps | null) => void;
  deleteTodo: (id: string) => void;
  getFilterList: (payload: GetFilterListParam) => void;
};

const defaultTodoList: TodoItemProps[] = [
  {
    id: "1",
    status: "todo",
    title: "Checking",
    description:
      "ur adipisicing elit. Totam pariatur reiciendis repellat ullam rem natus placeat commodi fugiat quae",
  },
  {
    id: "2",
    status: "completed",
    title: "Handle TimeSheet Calender",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam pariatur reiciendis repellat ullam rem natus placeat commodi fugiat quaerat tempora?",
  },
  {
    id: "3",
    status: "completed",
    title: "Filling some tuplewares on the housewares",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam pariatur reiciendis repellat ullam rem natus placeat commodi fugiat quaerat tempora? Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam pariatur reiciendis repellat ullam rem natus placeat commodi fugiat quaerat tempora?",
  },
  {
    id: "4",
    status: "uncompleted",
    title: "Provide a challenge",
    description: "Lorem ipsum dolor sit aat tempora?",
  },
];

const useTodoListStore = create<State & Action>((set) => ({
  todoList: defaultTodoList,
  filterList: [],
  todoSelected: null,
  setTodoSelected: (payload) => set(() => ({ todoSelected: payload })),
  getFilterList: ({ searchingValue, status }) =>
    set(({ todoList }) => {
      let response: TodoItemProps[] = todoList;
      if (searchingValue) {
        response = response.filter((item) =>
          item.title
            .toLocaleLowerCase()
            .includes(searchingValue.toLocaleLowerCase())
        );
      }

      if (status !== "all") {
        response = response.filter((item) => item.status === status);
      }

      return { filterList: response };
    }),
  addTodo: (payload) =>
    set(({ todoList }) => ({
      todoList: [{ ...payload, id: uuid() }, ...todoList],
    })),
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
        return item.id !== id;
      });
      console.log({ newTodoList, id, todoList });

      return { todoList: newTodoList };
    }),
}));

export default useTodoListStore;
