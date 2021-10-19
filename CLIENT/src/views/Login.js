import { useState } from "react";
import Cookies from "universal-cookie";

import { Box, Typography, TextField, Button } from '@mui/material';
import { makeStyles, createStyles } from "@mui/styles";

import LoginSVG from '../components/loginSVG';

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
        alignItems:"center",
    },
    svg: {
        maxHeight:"75%",
        maxWidth:"75%"
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

const Login = (props) => {
    const classes = useStyles();

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
                const cookie = new Cookies();
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