import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { useGetRoomsQuery } from "../../state/api";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const Room = (data) => {
  const [isExpanded, setIsExpanded] = useState(true);
  // debugger
  return (
    <Card
      sx={{
        backgroundImage: "none",
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          Room: {data.roomName}
        </Typography>
        <Typography sx={{ mb: "0.5rem" }}>
          Namespace: {data.namespace}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        {data.clients.map((client) => (
          <Typography sx={{ ml: "1.5rem" }} component="div"> {client} </Typography>
        ))}
      </Collapse>
    </Card>
  );
};

const Rooms = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data, isLoading } = useGetRoomsQuery("namespaceDefault");
  const isNonMobile = useMediaQuery("(min-width:1000px");

  console.log("data", data);
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Rooms" />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4,minmax(0,1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.map((data) => (
            <Room
              key={data.roomName}
              namespace={data.namespace}
              roomName={data.roomName}
              clients={data.clients}
            />
          ))}
        </Box>
      ) : (
        <>Rooms data loading...</>
      )}
    </Box>
  );
};

export default Rooms;
