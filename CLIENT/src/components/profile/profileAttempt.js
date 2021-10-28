import React, { useState, useEffect } from "react";
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

    const {quiz_id, Score, createdAt } = props.attempt;
    const { attemptNum } = props;
    const [quizName, setQuizName] = useState("");

    useEffect(()=>{
        const getQuizName = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_URL}quiz/${quiz_id}`, {
                    method:"GET",
                    mode:"cors",
                    credentials:"include",
                    headers: {
                        'Access-Control-Allow-Origin':"http://localhost:3001"
                    }
                });
                const data = await res.json();
                if(data.status) {
                    setQuizName(data.quiz_name);
                } else {
                    console.log("Something Went Wrong!");
                }
            } catch (e) {
                console.log(e);
            }
        }

        getQuizName();
    },[])

    return (
        <Box className={classes.box}>
            <Typography variant="h4"> Attempt #{ attemptNum } </Typography>
            <Typography variant="h4"> { quizName } </Typography>
            <Typography variant="h6"> You scored : { Score } </Typography>
            <Typography gutterBottom variant="h6"> Attempted At : { moment(createdAt).fromNow() } </Typography>
            <Box>
                <Button onClick={()=>{window.location.assign(`/quiz/${quiz_id}`)}}variant="outlined"> Go to Quiz </Button>
            </Box>
        </Box>
    );
}
 
export default ProfileAttempt;