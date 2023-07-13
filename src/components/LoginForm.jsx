import { useState, useEffect } from "react";
import { Box, Button, TextField, useMediaQuery, Typography, useTheme } from "@mui/material";
import { EditOutlined } from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import setLogin from "../state/index";
import { useDispatch } from "react-redux";
import { tokens } from "../theme";

const loginSchema = yup.object().shape({
	email: yup.string().email("invalid email").required("required field"),
	password: yup.string().required("required field"),
});

const defaultValuesLogin = {
	email: "",
	password: "",
};

function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(";").shift();
}

const LoginForm = ({ setIsLoggedIn }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isNonMobile = useMediaQuery("(min-width:600px)");

	const login = async (values, onSubmitProps) => {
		const loggedInResponse = await fetch("http://localhost:3001/api/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "same-origin",
			withCredentials: true,
			credentials: "include",
			body: JSON.stringify(values),
		});
		const loggedIn = await loggedInResponse.json();
		onSubmitProps.resetForm();
		if (loggedIn) {
			setTimeout(() => {
				setIsLoggedIn(!!getCookie("WS-MANAGER-AUTH"));
				navigate("/");
				console.log(loggedIn.sessionToken);
			}, 1000);
		}
	};

	const handleFormSubmit = async (values, onSubmitProps) => {
		await login(values, onSubmitProps);
	};
	<Button
		fullWidth
		type="submit"
		sx={{
			m: "2rem 0",
			p: "1rem",
		}}
	>
		Login
	</Button>;

	return (
		<Formik onSubmit={handleFormSubmit} initialValues={defaultValuesLogin} validationSchema={loginSchema}>
			{({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm }) => (
				<form onSubmit={handleSubmit}>
					<Box
						display="grid"
						gap="25px"
						gridTemplateColumns="repeat(2,minmax(0,1fr))"
						sx={{
							"& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
						}}
					>
						<TextField label="Email" onBlur={handleBlur} onChange={handleChange} value={values.email} name="email" error={Boolean(touched.email) && Boolean(errors.email)} helperText={touched.email && errors.email} sx={{ gridColumn: "span 2" }} />
						<TextField
							label="Password"
							type="password"
							onBlur={handleBlur}
							onChange={handleChange}
							value={values.password}
							name="password"
							error={Boolean(touched.password) && Boolean(errors.password)}
							helperText={touched.password && errors.password}
							sx={{ gridColumn: "span 2" }}
						/>
					</Box>

					<Box>
						<Button
							type="submit"
							sx={{
								m: "2rem 0",
								p: "1rem",
								backgroundColor: colors.primary[400],
								color: colors.grey[100],
								"&:hover": { backgroundColor: colors.primary[800] },
							}}
						>
							Login
						</Button>
					</Box>
				</form>
			)}
		</Formik>
	);
};

export default LoginForm;
