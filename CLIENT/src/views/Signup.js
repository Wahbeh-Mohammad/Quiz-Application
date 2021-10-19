import React from 'react';
import { useState } from 'react';
import Cookies from 'universal-cookie';
import utils from "../Utils/authUtils";
import { Typography, Box, TextField, Button } from '@mui/material';
import { makeStyles, createStyles } from "@mui/styles";
import SignupSVG from '../components/signupSVG';

const { checkUsername, checkPassword } = utils;

const Styles = (theme) => createStyles({
    main: {
        display:"grid",
        gridTemplateColumns:"50% 50%",
        margin:"2% 10%",
        boxShadow:"0px 0px 5px 5px rgba(0,0,0,30%)",
        borderRadius:"15px",
        [theme.breakpoints.down(900)]: {
            display:"block",
            height:"100%",
            boxShadow:"none"
        },
        [theme.breakpoints.down(600)]: {
            margin:"0%"
        }
    },
    svgBox:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    svg: {
        maxHeight:"75%",
        maxWidth:"75%",
        [theme.breakpoints.down(1300)]: {
            maxWidth:"50%",
            maxHeight:"50%"
        }
    },
    center:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        background: theme.palette.primary.main,
        border:`2px solid ${theme.palette.primary.main}`,
        borderTopRightRadius:"15px",
        borderBottomRightRadius:"15px",
        color:"white"
    },
    form: {
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        borderTopLeftRadius:"15px",
        borderBottomLeftRadius:"15px",
        [theme.breakpoints.down(900)]: {
            borderRadius:"15px",
            padding:"2rem 0rem",
            height:"100%"
        },
        [theme.breakpoints.down(600)]: {
            border:"none",
            height:"100%",
            boxShadow:"none"
        }

    },
    formGroup: {
        display:"flex",
        flexDirection: "column",
        justifyContent:"center",
        alignItems:"center",
        margin: "1rem 0rem",
        width:"100%",
    },
    Input: {
        width:"80%",
        [theme.breakpoints.down(600)]: {
            width:"100%"
        }
    },
    adjustTexth2: {
        fontSize:"3rem",
        [theme.breakpoints.down(1250)]: {
            fontSize:"2.5rem"
        }
    },
    adjustTexth3: {
        fontSize:"2rem",
        [theme.breakpoints.down(1250)]: {
            fontSize:"1.5rem"
        }
    },
    hide: {
        [theme.breakpoints.down(900)]: {
            display:"none"
        }
    }
});

const useStyles = makeStyles(Styles);

const Signup = (props) => {
    const classes = useStyles();

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