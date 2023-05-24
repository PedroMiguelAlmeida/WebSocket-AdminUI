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
import { useGetNamespacesQuery, useGetTopicsQuery,useGetNamespaceQuery } from "../../state/api";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const Topic = (data) => {
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
          Topic: {data.topicName}
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
      {/* <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        {data.topics.clients.map((client) => (
          <Typography sx={{ ml: "1.5rem" }} component="div"> {client} </Typography>
        ))}
      </Collapse> */}
    </Card>
  );
};

const Topics = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data, isLoading } = useGetNamespaceQuery("namespace1");
  const isNonMobile = useMediaQuery("(min-width:1000px");

  console.log("data", data);
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Topics" />
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
          {data.topics.map((entry) => (
            <Topic
              key={entry._id}
              topicName={entry.topicName} 
              namespace={data.namespace}
            />
          ))}
        </Box>
      ) : (
        <>Topics data loading...</>
      )}
    </Box>
  );
};

export default Topics;
