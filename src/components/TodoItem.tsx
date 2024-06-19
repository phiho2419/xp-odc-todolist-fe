import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ReorderIcon from "@mui/icons-material/Reorder";
import { Box, Grid, Stack, Tooltip, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { TodoItemProps } from "../types";

interface ICompTodoItem {
  item: TodoItemProps;
}

type RenderByStatus = {
  todo: React.ReactNode;
  completed: React.ReactNode;
  unknow: React.ReactNode;
};

const statusText: RenderByStatus = {
  todo: (
    <Typography
      sx={{
        fontWeight: "bold",
        width: "100%",
        backgroundColor: "#fdab3d",
        textAlign: "center",
        color: "white",
        paddingY: "5px",
        fontSize: "14px",
      }}
    >
      To do
    </Typography>
  ),
  completed: (
    <Typography
      sx={{
        fontWeight: "bold",
        width: "100%",
        backgroundColor: "#00c875",
        textAlign: "center",
        color: "white",
        paddingY: "5px",
        fontSize: "14px",
      }}
    >
      Completed
    </Typography>
  ),
  unknow: <></>,
};

const TodoItem = ({ item }: ICompTodoItem) => {
  const [value, setValue] = useState<Dayjs | null>(dayjs("2022-04-17"));

  return (
    <Box
      sx={{
        height: "340px",
        borderRadius: "4px",
        boxShadow: " 0 4px 8px rgba(0,0,0,.2)",
      }}
    >
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
            sx={{ wordBreak: "break-word" }}
            lineHeight={"24px"}
            pt={"8px"}
            display={"inline"}
          >
            {item.title?.length < 25
              ? item.title
              : item.title.slice(0, 25) + "..."}
          </Typography>
        </Tooltip>

        <Stack mt={2} gap={"15px"}>
          <Grid container alignItems={"center"}>
            <Grid item xs={5} display={"flex"}>
              <Typography fontSize={"14px"} mr={"4px"} lineHeight={"14px"}>
                <ReorderIcon />
              </Typography>
              <Typography fontSize={"14px"} lineHeight={"24px"}>
                Status
              </Typography>
            </Grid>
            <Grid item xs={7}>
              {statusText[item.status]}
            </Grid>
          </Grid>
          <Grid container alignItems={"center"}>
            <Grid item xs={5} display={"flex"}>
              <Typography fontSize={"14px"} mr={"4px"} lineHeight={"14px"}>
                <CalendarTodayIcon />
              </Typography>
              <Typography fontSize={"14px"} lineHeight={"24px"}>
                Due Date
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <DatePicker
                label="Due Date"
                value={value}
                onChange={(newValue) => setValue(newValue)}
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
        }}
      >
        {item.description && (
          <Typography variant="body2">
            {item.description?.length < 240
              ? item.description
              : item.description.slice(0, 240) + "..."}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default TodoItem;
