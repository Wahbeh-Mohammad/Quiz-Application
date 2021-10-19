import React from "react";
import { Box, Typography } from '@mui/material';
import { createStyles, makeStyles } from "@mui/styles";

const Styles = (theme) => createStyles({
    main:{ 
        display:'flex',
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },
    img: {
        maxHeight:"75%",
        maxWidth:"100%"
    }
});

const useStyles = makeStyles(Styles);

const NotFound = (props) => {
    const classes = useStyles();
    return (
        <Box className={classes.main}>
            <Typography variant="h2" color="primary"> 404 Not Found </Typography>
            <img className={classes.img} src="404.png" alt="404" />
        </Box>
    );
}
 
export default NotFound;