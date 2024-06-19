import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CloseIcon from "@mui/icons-material/Close";
import ReorderIcon from "@mui/icons-material/Reorder";
import {
  Button,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { v4 as uuid } from "uuid";
import useTodoListStore from "../store/TodoList";
import { TodoItemProps } from "../types";
import { StatusList } from "../utils";
import { RenderStatusText } from "./TodoItem";
import { MouseEvent, useEffect, useState } from "react";

interface ICompTodoItemModal {
  handleClose: () => void;
  handleSubmit: (values: TodoItemProps) => void;
  open: boolean;
  title: string;
  mode: "add" | "update";
}

const defaultValues: TodoItemProps = {
  id: uuid(),
  status: "todo",
  title: "New Task",
  description: "",
  dueDate: null,
};

const TodoItemModal = ({
  handleClose,
  open,
  handleSubmit,
  mode,
  title,
}: ICompTodoItemModal) => {
  const { todoSelected, setTodoSelected } = useTodoListStore((state) => state);
  const [values, setValues] = useState<TodoItemProps>(defaultValues);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openStatusMenu = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseStatusMenu = () => {
    setAnchorEl(null);
  };

  const onSubmit = () => {
    if (values.title) {
      handleSubmit(values);
    }
  };

  useEffect(() => {
    if (mode === "add") {
      setValues(defaultValues);
    } else if (mode === "update" && todoSelected) {
      setValues(todoSelected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, todoSelected]);

  useEffect(() => {
    if (!open) {
      setValues(defaultValues);
      setTodoSelected(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 500,
            height: `100vh`,
            bgcolor: "background.paper",
            boxShadow: 24,
            maxWidth: "100vw",
          }}
        >
          <Box
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">{title}</Typography>
            <Box display={"flex"} gap={1}>
              <Button variant="contained" onClick={onSubmit}>
                Save
              </Button>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          <Divider />
          <Stack sx={{ p: 4 }} gap={2}>
            <TextField
              label="Task Name"
              variant="outlined"
              size="small"
              value={values.title}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, title: e.target.value }))
              }
              fullWidth
              helperText={!values.title && "Required !"}
              error={!values.title}
            />

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
                  {RenderStatusText(values.status)}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={openStatusMenu}
                  onClose={handleCloseStatusMenu}
                >
                  {StatusList.map((item, index) => (
                    <MenuItem
                      onClick={() => {
                        setValues((prev) => ({
                          ...prev,
                          status: item,
                        }));
                        handleCloseStatusMenu();
                      }}
                      key={index}
                      sx={{ width: "250px", padding: 1 }}
                    >
                      {RenderStatusText(item)}
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
                  value={values.dueDate}
                  onChange={(newValue) =>
                    setValues((prev) => ({ ...prev, dueDate: newValue }))
                  }
                  slotProps={{ textField: { size: "small", fullWidth: true } }}
                />
              </Grid>
            </Grid>

            <TextField
              label="Description"
              variant="outlined"
              size="small"
              value={values.description}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, description: e.target.value }))
              }
              fullWidth
              multiline
              minRows={5}
            />
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};
export default TodoItemModal;
