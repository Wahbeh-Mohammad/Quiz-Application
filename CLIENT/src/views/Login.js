import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import verifyToken from "../Utils/verificationUtils";
import { Box, Typography, TextField, Button } from '@mui/material';
import { makeStyles, createStyles } from "@mui/styles";
import LoginSVG from '../components/SVG/loginSVG';
import Styles from "../styles/Login";

const useStyles = makeStyles(Styles);

const Login = (props) => {
    const classes = useStyles();
    const cookie = new Cookies();
    const [authorized, setAuthorized] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorText, setErrorText] = useState("");

    const submitForm = async (e, username, password) => {
        e.preventDefault();
        setErrorText("");
        try{
            const postBody = { username, password };
            const res = await fetch(`${process.env.REACT_APP_API_URL}login`, {
                method:"POST",
                mode:"cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(postBody)
            });
            const data = await res.json();
            if(data.status) {
                // If Credentials are correct create a cookie that lasts a day.
                const maxAge = 1*24*60*60;
                cookie.set('jwt', data.Token, { maxAge: maxAge, path:"/" });
                window.location.assign("/");
            } else {
                // set error text
                setErrorText("Incorrect Username or Password");
            }
        } catch (err) {
            setErrorText("Something went wrong, Please try again later.")
        }
    }

    useEffect(()=>{
        verifyToken().then(({status})=> {
            if(status) setAuthorized(true);
            else setAuthorized(false);            
        }).catch(e => {
            console.log(e);
            setAuthorized(false);
        })
    },[]);

    return ( 
        <Box className={ classes.main }>
            <Box className={ classes.form }>
                <Typography variant="h2">Login</Typography>
                <Box className={classes.formGroup}>
                    <TextField className={ classes.Input } type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
                </Box>
                <Box className={classes.formGroup}>
                    <TextField className={ classes.Input } type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                </Box>
                <Typography color="error" variant="h6">{ errorText }</Typography>
                <Button size="large" variant="contained" onClick={(e)=>{submitForm(e, username, password)}}>Login!</Button>
            </Box>
            <Box className={[classes.hide , classes.center]}>
                <Typography variant="span" className={classes.adjustTexth2}>Quiz & Conquer</Typography>
                <Typography variant="span" className={classes.adjustTexth3}>Login & Compete</Typography>
                <Box className={classes.svgBox}>
                    <LoginSVG styles={classes.svg} />
                </Box>
            </Box>
        </Box>
    );
}
 
export default Login;