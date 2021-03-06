import React, { useState, useEffect  } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Typography, Box, Button } from "@mui/material";
import verifyToken from "../Utils/verificationUtils";

import Styles from "../styles/Home";

const useStyles = makeStyles(Styles);

const Home = (props) => {
    const classes = useStyles();

    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        verifyToken().then(({status,Token}) => {
            if(status) {
                setAuthorized(true);
            } else {
                setAuthorized(false);
            }
        }).catch(e=>{console.log(e)});
    }, []);
    
    return ( 
        <Box className={ classes.landing }>
            <Box className={classes.landingText}>
                <Typography variant="h3"> Hello, Welcome to <Typography variant="span" color="primary">Quiz & Conquer</Typography>. </Typography>
                <Typography varaint="h5"> Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                Quidem ex beatae hic deleniti! Quia iusto vitae rerum, nam adipisci tempore, esse, 
                libero ab animi quaerat necessitatibus. Odit suscipit laboriosam aspernatur quas explicabo distinctio iste amet, 
                excepturi tempora harum soluta ducimus hic corrupti, facilis alias, enim at perspiciatis similique numquam ut. </Typography>
                {!authorized && <Box className={classes.actions}> 
                    <Button onClick={() => {window.location.assign("/login")}} variant="outlined">Login</Button>
                    <Button onClick={() => {window.location.assign("/signup")}} variant="contained">Register</Button>
                </Box>}
                {authorized && <Box> 
                    <Button onClick={() => {window.location.assign("/quizzes")}} variant="contained">Quizzes</Button>
                </Box>}
                
            </Box>
            <Box className={classes.center}>
                <img className={ classes.img } src="Landing.png" alt="LandingImg" />
            </Box>
        </Box>
    );
}
 
export default Home;