import { Box, Container, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box
      sx={{
        background: "#eceff8",
      }}
    >
      <Container sx={{ position: "relative", padding: "20px" }}>
        <Typography variant="h5" fontWeight={"bold"}>
          Hi there ! How are you doing today ?
        </Typography>
        <Typography variant="h6">
          Welcome to "Todo List" app, which is builded by React + Vite and more
          ...
        </Typography>
        <Typography variant="h6">
          One tool for doing it all, together
        </Typography>
      </Container>
    </Box>
  );
};

export default Header;
