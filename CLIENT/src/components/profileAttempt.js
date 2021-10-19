import React, { useState } from "react";
import moment from "moment";
import { Box, Typography, Button } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

const Styles = (theme) => createStyles({
    box: {
        display:"flex",
        flexDirection:"column",
        padding:"1rem",
        margin:"1.2rem 1rem",
        boxShadow:"0px 0px 10px 3px rgba(0,0,0,30%)",
        borderRadius:"15px"
    }
})

const useStyles = makeStyles(Styles);

const ProfileAttempt = (props) => {
    const classes = useStyles();

    const {quiz_id, Score, createdAt, quiz_name} = props.attempt;
    const { attemptNum } = props;

    return (
        <Box className={classes.box}>
            <Typography variant="h4"> Attempt #{ attemptNum } </Typography>
            <Typography variant="h4"> { quiz_id } </Typography>
            <Typography variant="h6"> You scored : { Score } </Typography>
            <Typography variant="h6"> Attempted At : { moment(createdAt).fromNow() } </Typography>
        </Box>
    );
}
 
export default ProfileAttempt;