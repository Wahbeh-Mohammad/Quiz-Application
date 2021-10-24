// Utils
import { useState, useEffect } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import Cookies from "universal-cookie";
import verifyToken from '../Utils/verificationUtils';
// Components
import { Link } from "react-router-dom";
import { Box, Button, Avatar, Typography } from '@mui/material';

// Styles hook
const Styles = (theme) => createStyles({
    header: {
        [theme.breakpoints.down(1250)]:{
            display:"flex",
            flexDirection:"column"
        },
        zIndex:"1",
        width:"100%",
        maxWidth:"100%",
        justifyContent:"center",
        alignItems:"center",
        display:"grid",
        gridTemplateColumns:"20% 80%",
        padding:"1rem 2rem",
        boxShadow:"0px 0px 25px 2px rgba(0,0,0,30%)",
        border:"none"
    },
    Links: {
        [theme.breakpoints.down("sm")]:{
            flexDirection:"column-reverse"
        },
        display:"flex",
        flexDirection:"row-reverse",
        alignItems:"center"
    },
    Link: {
        textDecoration:"none",
        margin:"0rem 1rem",
        borderBottom: "1px solid white",
        '&:hover': {
            borderBottom: "1px solid #1565c0"
        }
    },
    pointer: {
        cursor:"Pointer"
    },
    marginX: {
        margin:"0rem 1rem"
    },
    bgColor: {
        background:"#1565c0"
    },
    updatedFontSize : {
        [theme.breakpoints.up(1251)]: {
            fontSize:"2rem"
        },
        [theme.breakpoints.down(1250)]: {
            fontSize: "1.8rem"   
        }
    }
});

const useStyles = makeStyles(Styles);

const Header = (props) => {
    // Styles
    const classes = useStyles();
    // States
    const cookie = new Cookies();
    const [authorized, setAuthorized] = useState(false);
    const [username, setUsername] = useState("");
    // Handlers
    const handleLogout = (e) => {
        e.preventDefault();
        cookie.set('jwt', "", { maxAge:1, path:"/" });
        setAuthorized(false);
        window.location.assign("/");
    }
    const handleProfileRedirect = (e) => {
        e.preventDefault();
        window.location.assign("/profile")
    }

    useEffect(() => {
        verifyToken().then(({ status, Token }) => {
            if(status){
                setUsername(Token.username); 
                setAuthorized(true);
            } else {
                setAuthorized(false);
                setUsername("");
            }
        }).catch((e)=>{
            console.log(e); 
            setAuthorized(false)
        });
    },[]);

    return (
        <header className={classes.header}>
            <Typography variant="span" className={classes.updatedFontSize}>
                Quiz <Typography className={classes.updatedFontSize} color="primary" variant="span">&</Typography> Conquer
            </Typography>
            <Box className={classes.Links}>
                { !authorized && <> 
                        <Link className={classes.Link} to="/signup">
                            <Typography color="primary" variant="h5">Signup</Typography>
                        </Link>
                        <Link className={classes.Link} to="/login">
                            <Typography color="primary" variant="h5">Login</Typography>
                        </Link>
                </>}
                { authorized && <>
                        <Avatar className={ [classes.bgColor, classes.pointer, classes.marginX] } onClick={(e)=>{handleProfileRedirect(e)}}>
                            { username[0] }
                        </Avatar>  
                        <Button className={[classes.marginX]} variant="contained" color="primary" onClick={(e)=>{handleLogout(e)}}>Log out</Button>
                        <Link className={classes.Link} to="/createQuiz">
                            <Typography color="primary" variant="h5">Create Quiz</Typography>
                        </Link>
                </>}
                <Link className={classes.Link} to="/quizzes">
                    <Typography color="primary" variant="h5">Quizzes</Typography>
                </Link>
                <Link className={classes.Link} to="/">
                    <Typography color="primary" variant="h5">Home</Typography>
                </Link>
            </Box>
        </header>
    );
}
 
export default Header;