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
import { useGetNamespacesQuery, useGetRoomsQuery,useGetNamespaceQuery } from "../../state/api";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const Namespace = (data) => {
  const [isExpanded, setIsExpanded] = useState(true);
  // debugger
  console.log(data)
  return (
    <Card
      sx={{
        backgroundImage: "none",
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          Namespace: {data.namespace}
        </Typography>
        <Typography sx={{ mb: "0.5rem" }}>
          Amount of Rooms: {data.roomsCount}
        </Typography>
        <Typography sx={{ mb: "0.5rem" }}>
          Amount of Clients: {data.clientsCount}
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
      {/* <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        {data.rooms.clients.map((client) => (
          <Typography sx={{ ml: "1.5rem" }} component="div"> {client} </Typography>
        ))}
      </Collapse> */}
    </Card>
  );
};

const Namespaces = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data, isLoading } = useGetNamespacesQuery();
  const isNonMobile = useMediaQuery("(min-width:1000px");

  console.log("data", data);
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Namespaces" />
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
          {data.map((entry) => (
            <Namespace
              key={entry._id}
              namespace={entry.namespace} 
              roomsCount={entry.roomsCount}
              clientsCount={entry.clientsCount}
            />
          ))}
        </Box>
      ) : (
        <>Namespaces data loading...</>
      )}
    </Box>
  );
};

export default Namespaces;
