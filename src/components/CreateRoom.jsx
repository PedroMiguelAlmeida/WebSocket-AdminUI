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
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { useLocation } from "react-router-dom";
import { useGetNamespaceQuery } from "../state/api";


const roomSchema = yup.object().shape({
  roomName: yup.string().required("Room must have a name"),
  schema: yup.string().optional(),
});

const defaultValuesRoom = {
  roomName: "",
};

const CreateRoomForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const location = useLocation();

  console.log(location.state.namespace, "CREATING ROOM IN NAMESPACE")
  const { data, isLoading } =  useGetNamespaceQuery(location.state.namespace);


  const createRoom = async (values, onSubmitProps) => {
    
    const createRoom = await fetch(`http://localhost:8080/api/namespaces/${location.state.namespace}/rooms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
    onSubmitProps.resetForm();
  } ;


  const handleFormSubmit = async (values, onSubmitProps) => {
    await createRoom(values, onSubmitProps);
  };


  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={defaultValuesRoom}
      validationSchema={roomSchema}
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
              label="Room Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.roomName}
              sx={{
                ml:"1rem"
              }}
              name="roomName"
              error={Boolean(touched.roomName) && Boolean(errors.roomName)}
              helperText={touched.roomName && errors.roomName}
            />
            <Dropzone
              acceptedFiles=".json, .json.schema"
              multiple={false}
              onDrop={(acceptedFiles) =>
                (setFieldValue = ("schema", acceptedFiles[0]))
              }
            >
              {({getRootProps,getInputProps})=>
              (
                <Box
                {...getRootProps()}
                border="2px"
                p="1rem"
                sx={{"&:hover":{cursor:"pointer"}}}
                >
                  <input {...getInputProps()} />
                  {!values.schema ? (
                    <p>Press to add schema</p>
                  ): <Box>
                      <Typography>{values.schema.name}</Typography>
                      <ModeEditOutlineOutlinedIcon/>
                    </Box>}
                </Box>
              )}

            </Dropzone>
          </Box>

          <Box>
            <Button
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                ml: "1rem",
                backgroundColor: colors.primary[400],
                color:colors.grey[100],
                "&:hover": { backgroundColor: colors.primary[800] },
              }}
              
            >
              Create Room
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default CreateRoomForm;
