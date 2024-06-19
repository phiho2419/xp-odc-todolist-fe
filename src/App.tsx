import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Container,
  Grid,
  InputBase,
  styled,
  useMediaQuery,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header";
import TodoItem from "./components/TodoItem";
import TodoItemModal from "./components/TodoItemModal";
import useTodoListStore from "./store/TodoList";
import { TodoItemProps, TodoStatus } from "./types";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#eceff8",
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function App() {
  const {
    todoList,
    filterList,
    getFilterList,
    deleteTodo,
    addTodo,
    updateTodo,
  } = useTodoListStore((state) => state);
  const matches = useMediaQuery("(min-width:600px)");
  const [statusFilter, setStatusFilter] = useState<TodoStatus | "all">("all");
  const [searchingValue, setSearchingValue] = useState<string>("");

  const handleChange = (event: SelectChangeEvent<typeof statusFilter>) => {
    setStatusFilter(event.target.value as typeof statusFilter);
  };

  //status filter
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  //todo add modal
  const [openAddModal, setOpenAddModal] = useState(false);
  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  //todo update modal
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const handleOpenUpdateModal = () => setOpenUpdateModal(true);
  const handleCloseUpdateModal = () => setOpenUpdateModal(false);

  useEffect(() => {
    getFilterList({ searchingValue, status: statusFilter });
  }, [searchingValue, statusFilter, getFilterList, todoList]);

  const handleAddTodo = useCallback(
    (payload: TodoItemProps) => {
      addTodo(payload);
      handleCloseAddModal();
    },
    [addTodo]
  );

  const handleUpdateTodo = useCallback(
    (payload: TodoItemProps) => {
      updateTodo(payload);
      handleCloseUpdateModal();
    },
    [updateTodo]
  );

  const handleDeleteTodo = useCallback(
    (id: string) => {
      deleteTodo(id);
    },
    [deleteTodo]
  );

  return (
    <>
      <Header />
      <Container sx={{ position: "relative" }}>
        <Box
          sx={{
            display: "flex",
            paddingY: "20px",
            justifyContent: "end",
            alignItems: matches ? "center" : "end",
            flexDirection: matches ? "row" : "column",
          }}
        >
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              value={searchingValue}
              onChange={(e) => setSearchingValue(e.target.value)}
            />
          </Search>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Filter</InputLabel>
            <Select
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={statusFilter}
              label="Filter"
              onChange={handleChange}
              size="small"
              defaultValue="all"
            >
              <MenuItem value={"all"}>All</MenuItem>
              <MenuItem value={"todo"}>Todo</MenuItem>
              <MenuItem value={"completed"}>Completed</MenuItem>
              <MenuItem value={"uncompleted"}>Un Completed</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            endIcon={<AddIcon />}
            onClick={() => handleOpenAddModal()}
          >
            New Task
          </Button>
        </Box>
        <Grid container>
          {filterList.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} p={1}>
              <TodoItem
                item={item}
                key={index}
                openModal={handleOpenUpdateModal}
                handleDelete={handleDeleteTodo}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <TodoItemModal
        mode="add"
        handleSubmit={(payload) => handleAddTodo(payload)}
        title="Create your new task"
        handleClose={handleCloseAddModal}
        open={openAddModal}
      />
      <TodoItemModal
        mode="update"
        handleSubmit={(payload) => handleUpdateTodo(payload)}
        title="Update your task"
        handleClose={handleCloseUpdateModal}
        open={openUpdateModal}
      />
    </>
  );
}

export default App;
