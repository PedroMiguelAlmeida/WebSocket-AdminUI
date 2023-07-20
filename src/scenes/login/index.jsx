import { useTheme, Box, Typography, useMediaQuery } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import LoginForm from "../../components/LoginForm";

const Login = ({setIsLoggedIn, setUser}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:1000px");

  return (
    <Box>
      <Box width="100%" p="1rem" textAlign="center">
        <Header title="Login" />
      </Box>
      <Box width={isNonMobile ? "50%" : "100%"} p="1.5rem" m="2.5rem auto">
        <Typography variant="h5" sx={{ mb: "2rem" }}>
          Welcome to Websocket Manager Admin UI
        </Typography>
        <LoginForm setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
      </Box>
    </Box>
  );
};

export default Login;
