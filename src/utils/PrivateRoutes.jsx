import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = (token) => {
	let auth = { isToken: token };
	console.log("PrivateRoutes", token);
	return auth.isToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
