import { Dayjs } from "dayjs";

export type TodoStatus = "todo" | "completed" | "uncompleted";

export type TodoItemProps = {
  id: string;
  title: string;
  dueDate?: null | Dayjs;
  description?: string;
  status: TodoStatus;
};

export type GetFilterListParam = {
  status: TodoStatus | "all";
  searchingValue: string;
};

export type UpdateTodoPayload = {
  id: string;
  title?: string;
  description?: string;
  status?: TodoStatus;
  dueDate?: null | Dayjs;
};
