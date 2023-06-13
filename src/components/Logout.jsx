import { Outlet, Navigate, useNavigate, } from "react-router-dom";
import { useCookies } from 'react-cookie';

const Logout = ({isLoggedIn} ,{setIsLoggedIn}, {removeCookie},{cookies}) => {
    const navigate = useNavigate()
    
    console.log(cookies);
    function removeCookie() {
        if(isLoggedIn){
            removeCookie('WS-MANAGER-AUTH')
        }
        setIsLoggedIn(false)
        navigate("/login")
      }
	return removeCookie();
};

export default Logout;
