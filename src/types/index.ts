export type TodoStatus = "todo" | "completed";

export type TodoItemProps = {
  id: string;
  title: string;
  description?: string;
  status: TodoStatus;
};
