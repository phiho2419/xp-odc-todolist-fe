import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Container,
  Grid,
  InputBase,
  styled,
  Typography,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TodoItem from "./components/TodoItem";
import useTodoListStore from "./store/TodoList";
import { useState } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#eceff8",
  // "&:hover": {
  //   backgroundColor: "#cecece",
  // },
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
  const todoList = useTodoListStore((state) => state.todoList);
  const [age, setAge] = useState<string | number>("all");
  const [open, setOpen] = useState(false);

  const handleChange = (event: SelectChangeEvent<typeof age>) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Container sx={{ position: "relative" }}>
        <Box
          sx={{
            height: "100px",
            position: "sticky",
            top: "0",
            left: "0",
            background: "#eceff8",
            display: "flex",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <Typography variant="h5" fontWeight={"bold"}>
            Hi there ! How are you doing today ?
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            paddingY: "20px",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          {/* <Box display={"flex"} alignItems={"center"}> */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-controlled-open-select-label">
              Filter
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={age}
              label="Filter"
              onChange={handleChange}
              size="small"
            >
              <MenuItem value={"all"}>All</MenuItem>
              <MenuItem value={"todo"}>Todo</MenuItem>
              <MenuItem value={"completed"}>Completed</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" endIcon={<AddIcon />}>
            New Task
          </Button>
          {/* </Box> */}
        </Box>
        <Grid container gap={2}>
          {todoList.map((item, index) => (
            <Grid item xs={12} md={4} lg={3}>
              <TodoItem item={item} key={index} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default App;
