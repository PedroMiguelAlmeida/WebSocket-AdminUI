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

const namespaceSchema = yup.object().shape({
  namespace: yup.string().required("Namespace must have a name"),
});

const defaultValuesNamespace = {
  namespace: "",
};

const CreateNamespaceForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const createNamespace = async (values, onSubmitProps) => {
    const createNamespace = await fetch("http://localhost:8080/namespaces", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    onSubmitProps.resetForm();
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await createNamespace(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={defaultValuesNamespace}
      validationSchema={namespaceSchema}
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
              label="Namespace Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.namespace}
              sx={{
                ml:"1rem"
              }}
              name="namespace"
              error={Boolean(touched.namespace) && Boolean(errors.namespace)}
              helperText={touched.namespace && errors.namespace}
            />
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
              Create Namespace
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default CreateNamespaceForm;
