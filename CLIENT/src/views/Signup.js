import React,{ useState, useEffect } from 'react';
import verifyToken from "../Utils/verificationUtils";
import Cookies from 'universal-cookie';
import utils from "../Utils/authUtils";
import { Typography, Box, TextField, Button } from '@mui/material';
import { makeStyles, createStyles } from "@mui/styles";
import SignupSVG from '../components/SVG/signupSVG';
import Styles from '../styles/Signup';

const { checkUsername, checkPassword } = utils;

const useStyles = makeStyles(Styles);

const Signup = (props) => {
    const classes = useStyles();

    const [authorized, setAuthorized] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [generalError, setGeneralError] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const submitForm = async (e, username, password) => {
        e.preventDefault();

        // Validate the inputs
        setUsernameError("");
        setPasswordError("");
        setGeneralError("");
        // check against regexs
        let usernameValidity = checkUsername(username);
        let passwordValidity = checkPassword(password);
        if(!usernameValidity && username.length < 8) {
            setUsernameError("Invalid Username, must be of length 8 and up.");
            return;
        } else if(!usernameValidity) {
            setUsernameError("Invalid Username, Username must not contain any symbols.");
            return;
        }
        if(!passwordValidity) {
            setPasswordError("Invalid Password, must be of length 8 & up, contain at least a symbol & a capital letter.");
            return;
        }   
        if(password !== confirmPassword){
            setGeneralError("Passwords do not match.")
            return;
        }

        try { // if Ok send post request 
            const postBody = { username, password };
            const res = await fetch(`${process.env.REACT_APP_API_URL}signup`, {
                method:"POST",
                mode:"cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(postBody)
            });
            const data = await res.json();
            if(data.status){
                const cookie = new Cookies();
                const maxAge = 1*24*60*60;
                cookie.set('jwt', data.Token, { maxAge: maxAge });
                window.location.assign("/");
            } else {
                setGeneralError("Invalid Information");
            }
        } catch (err) {
            setGeneralError("Something went Wrong, Please try again later.");
            console.log(err);
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
    },[])

    return ( 
        <Box className={ classes.main }>
            <Box className={ classes.form }>
                <Typography variant="h2">Signup</Typography>
                    <Typography color="error" variant="span">{ generalError }</Typography>
                <Box className={classes.formGroup}>
                    <Typography color="error" variant="span">{ usernameError }</Typography>
                    <TextField className={ classes.Input } type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
                </Box>
                <Box className={classes.formGroup}>
                    <Typography color="error" variant="span">{ passwordError }</Typography>
                    <TextField className={ classes.Input } type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                </Box>
                <Box className={classes.formGroup}>
                    <TextField className={ classes.Input } type="password" placeholder="Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)}/>
                </Box>
                <Button variant="contained" size="large" onClick={(e)=>{submitForm(e, username, password)}}>Signup!</Button>
            </Box>
            <Box className={[classes.hide, classes.center, classes.shadow]}>
                <Typography variant="span" className={classes.adjustTexth2}>Quiz & Conquer</Typography>
                <Typography variant="span" className={classes.adjustTexth3}>Signup & Compete</Typography>
                <Box className={classes.svgBox}>
                    <SignupSVG className={ classes.svg } /> 
                </Box>
            </Box>
        </Box>
    );
}

export default Signup;