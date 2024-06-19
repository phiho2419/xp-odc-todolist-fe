import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DeleteIcon from "@mui/icons-material/Delete";
import ReorderIcon from "@mui/icons-material/Reorder";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import useTodoListStore from "../store/TodoList";
import { TodoItemProps, TodoStatus } from "../types";
import { StatusList } from "../utils";
interface ICompTodoItem {
  item: TodoItemProps;
  openModal: () => void;
  handleDelete: (id: string) => void;
}

export const RenderStatusText = (status: TodoStatus) => {
  let obj = { text: "", color: "" };
  switch (status) {
    case "todo":
      obj = { text: "Todo", color: "#00c875" };
      break;
    case "completed":
      obj = { text: "Completed", color: "#adadad" };
      break;
    case "uncompleted":
      obj = { text: "Un Completed", color: "#df2f4a" };
      break;
    default:
      break;
  }
  const { text, color } = obj;
  return (
    <Typography
      sx={{
        fontWeight: "bold",
        width: "100%",
        backgroundColor: color,
        paddingY: "5px",
        fontSize: "14px",
        textAlign: "center",
        color: "white",
        cursor: "pointer",
      }}
    >
      {text}
    </Typography>
  );
};

const TodoItem = ({ item, openModal, handleDelete }: ICompTodoItem) => {
  const { setTodoSelected, updateTodo } = useTodoListStore((state) => state);
  const handleOpenModal = () => {
    setTodoSelected(item);
    openModal();
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openStatusMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseStatusMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        height: "340px",
        borderRadius: "4px",
        boxShadow: " 0 4px 8px rgba(0,0,0,.2)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <IconButton
        sx={{
          position: "absolute",
          top: "2px",
          right: "0px",
          p: 0,
        }}
        onClick={() => handleDelete(item.id)}
        size="small"
      >
        <DeleteIcon />
      </IconButton>
      <Box
        sx={{
          height: "50%",
          padding: "10px",
        }}
      >
        <Tooltip title={item.title}>
          <Typography
            fontWeight={"700"}
            fontSize={"18px"}
            sx={{ wordBreak: "break-word", cursor: "pointer" }}
            lineHeight={"24px"}
            pt={"8px"}
            display={"inline"}
            color={"#676879"}
            onClick={handleOpenModal}
          >
            {item.title?.length < 25
              ? item.title
              : item.title.slice(0, 23) + "..."}
          </Typography>
        </Tooltip>

        <Stack mt={2} gap={"15px"}>
          <Grid container alignItems={"center"}>
            <Grid item xs={5} display={"flex"}>
              <Typography
                fontSize={"14px"}
                mr={"4px"}
                lineHeight={"14px"}
                color={"#676879"}
              >
                <ReorderIcon />
              </Typography>
              <Typography
                fontSize={"14px"}
                lineHeight={"24px"}
                color={"#676879"}
              >
                Status
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Button
                aria-controls={openStatusMenu ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openStatusMenu ? "true" : undefined}
                onClick={handleClick}
                sx={{ width: "100%", p: 0 }}
              >
                {RenderStatusText(item.status)}
              </Button>

              <Menu
                anchorEl={anchorEl}
                open={openStatusMenu}
                onClose={handleCloseStatusMenu}
              >
                {StatusList.map((status, index) => (
                  <MenuItem
                    onClick={() => {
                      updateTodo({ id: item.id, status: status });
                      handleCloseStatusMenu();
                    }}
                    key={index}
                    sx={{ width: "250px", padding: 0.5 }}
                  >
                    {RenderStatusText(status)}
                  </MenuItem>
                ))}
              </Menu>
            </Grid>
          </Grid>
          <Grid container alignItems={"center"}>
            <Grid item xs={5} display={"flex"}>
              <Typography fontSize={"14px"} mr={"4px"} lineHeight={"14px"}>
                <CalendarTodayIcon />
              </Typography>
              <Typography
                fontSize={"14px"}
                lineHeight={"24px"}
                color={"#676879"}
              >
                Due Date
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <DatePicker
                label="Due Date"
                value={item.dueDate}
                onChange={(newValue) =>
                  updateTodo({ id: item.id, dueDate: newValue })
                }
                slotProps={{ textField: { size: "small" } }}
              />
            </Grid>
          </Grid>
        </Stack>
      </Box>
      <Box
        sx={{
          height: "50%",
          background: " #ecedf5",
          padding: "10px",
          cursor: "pointer",
        }}
        onClick={handleOpenModal}
      >
        {item.description ? (
          <Typography variant="body2" color={"#676879"}>
            {item.description?.length < 220
              ? item.description
              : item.description.slice(0, 217) + "..."}
          </Typography>
        ) : (
          <Typography variant="body2" color={"#676879"}>
            Update some description here ....
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default TodoItem;
