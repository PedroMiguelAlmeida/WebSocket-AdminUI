import React, { useState } from "react";
import {
  Box,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { useGetNamespaceQuery } from "../state/api";
import {
  Redirect,
  Route,
  Switch,
  Router,
  useRoutes,
  useNavigate,
  Link,
} from "react-router-dom";
import { useGetTopicQuery } from "../state/api";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const TopicSchema = ({ isLoading, data }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  // debugger
  return !isLoading ? (
    <Card
      sx={{
        backgroundImage: "none",
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          Topic Schema
        </Typography>
        {data.topics[0].topicSchema}
      </CardContent>
    </Card>
  ) : (
    <></>
  );
};

const EntityDataGridClients = (props) => {
  const theme = useTheme();
  const location = useLocation();
  const colors = tokens(theme.palette.mode);

  const { data, isLoading } = useGetTopicQuery({
    namespace: location.state.namespace,
    topicName: location.state.topicName,
  });

  const [messageHistoryTopics, setMessageHistoryTopics] = useState([]);

  useEffect(() => {
    if (props.lastJsonMessage !== null) {
      props.lastJsonMessage.id = uuidv4();
      setMessageHistoryTopics((prev) => {
        // debugger;
        const alreadyExists = !!prev.filter(
          (msg) => msg.payload.msgDate === props.lastJsonMessage.payload.msgDate
        ).length;
        if (!alreadyExists) {
          return [...prev, props.lastJsonMessage];
        } else {
          return prev;
        }
      });
      console.log(props.lastJsonMessage);
      console.log(messageHistoryTopics);
    }
  }, [props.lastJsonMessage, setMessageHistoryTopics]);

  const columnsConnClient = [
    {
      field: "client",
      headerName: "Connected Client",
      flex: 1,
    },
  ];

  const columnsWebsocket = [
    {
      field: "msgDate",
      flex: 1,
      headerName: "Date",
    },
    {
      field: "username",
      flex: 1,
      headerName: "Username",
    },
    {
      field: "type",
      flex: 1,
      headerName: "Event",
    },
    {
      field: "message",
      flex: 1,
      headerName: "Message",
    },
  ];
  if (!isLoading) {
    console.log("DATA", data.topics);
  }

  return (
    <Box
      mt="40px"
      height="75vh"
      sx={{ display: "grid", gap: "1", gridTemplateColumns: "repeat(2,1fr)" }}
    >
      <Box>
        <DataGrid
        sx={{ml:"2rem"}}
          loading={!messageHistoryTopics}
          getRowId={(row) => row.id}
          rows={
            messageHistoryTopics
              ? messageHistoryTopics.map((entry) => ({
                  id: entry.id,
                  msgDate: entry.payload.msgDate,
                  username: entry.payload.username,
                  type: entry.type,
                  message: JSON.stringify(entry.payload.msg),
                }))
              : []
          }
          columns={columnsWebsocket}
        />
      </Box>
      <Box>
        <DataGrid
          sx={{width:400, ml:"2rem"}}
          loading={isLoading}
          getRowId={(row) => row.id}
          rows={
            data
              ? data.topics[0].clients.map((entry) => ({
                  id: entry._id,
                  client: entry.username,
                }))
              : []
          }
          disableSelectionOnClick
          columns={columnsConnClient}
        />
      </Box>
      {data || !isLoading ? (
        <Box
          mt="20px"
          ml="20px"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
        >
          <TopicSchema isLoading={isLoading} data={data} />
        </Box>
      ) : (
        <> Schema loading...</>
      )}
    </Box>
  );
};

export default EntityDataGridClients;
