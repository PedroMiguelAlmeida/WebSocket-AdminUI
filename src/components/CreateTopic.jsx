import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import setLogin from "../state/index";
import { useDispatch } from "react-redux";
import { tokens } from "../theme";
import Dropzone from "react-dropzone";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { useLocation } from "react-router-dom";
import { useGetNamespaceQuery } from "../state/api";

const topicSchema = yup.object().shape({
  topicName: yup.string().required("Topic must have a name"),
  topicSchema: yup.string().optional(),
});

const defaultValuesTopic = {
  topicName: "",
};

const CreateTopicForm = ({ setTopicData, topicData }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const location = useLocation();

  console.log(location.state.namespace, "CREATING Topic IN NAMESPACE");
  // const { data, isLoading } = useGetNamespaceQuery(location.state.namespace);

  const createTopic = async (values, onSubmitProps) => {
    console.log("VALUES", values);
    const createTopic = await fetch(
      `http://localhost:3001/api/namespaces/${location.state.namespace}/topics`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        credentials: "same-origin",
        withCredentials: true,
        credentials: "include",
      }
    );
    // if(values.schema){
    // 	const uploadedSchema = await fetch(
    // 		`http://localhost:3001/api/namespaces/${location.state.namespace}/topics/${values.topicName}/schema`,
    // 		{
    // 		  method: "PUT",
    // 		  headers: { "Content-Type": "application/json" },
    // 		  body: JSON.stringify(values),
    // 		  credentials: "same-origin",
    // 		  withCredentials: true,
    // 		  credentials: "include",
    // 		}
    // 	  );
    // }
    const topicCreated = await createTopic.json();
    onSubmitProps.resetForm();
    if (topicCreated) {
      setTimeout(() => {
        setTopicData({ ...topicData, topics: topicCreated.topics });
        navigate(-1);
      }, 1000);
      console.log("createdTopic", topicCreated);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await createTopic(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={defaultValuesTopic}
      validationSchema={topicSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box display="grid" gap="25px">
            <TextField
              label="Topic Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.topicName}
              sx={{
                ml: "1rem",
              }}
              name="topicName"
              error={Boolean(touched.topicName) && Boolean(errors.topicName)}
              helperText={touched.topicName && errors.topicName}
            />
            <TextField
              label="Topic Schema"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.topicSchema}
              sx={{
                ml: "1rem",
              }}
              name="topicSchema"
              error={Boolean(touched.topicSchema) && Boolean(errors.topicSchema)}
              helperText={touched.topicSchema && errors.topicSchema}
            />
            {/* <Dropzone
              acceptedFiles=".json, .json.schema"
              multiple={false}
              onDrop={(acceptedFiles) =>
                (setFieldValue = ("schema", acceptedFiles[0]))
              }
            >
              {({ getRootProps, getInputProps }) => (
                <Box
                  {...getRootProps()}
                  border="2px"
                  p="1rem"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!values.schema ? (
                    <p>Press to add schema</p>
                  ) : (
                    <Box>
                      <Typography>{values.schema.name}</Typography>
                      <ModeEditOutlineOutlinedIcon />
                    </Box>
                  )}
                </Box>
              )}
            </Dropzone> */}
          </Box>

          <Box>
            <Button
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                ml: "1rem",
                backgroundColor: colors.primary[400],
                color: colors.grey[100],
                "&:hover": { backgroundColor: colors.primary[800] },
              }}
            >
              Create Topic
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default CreateTopicForm;
