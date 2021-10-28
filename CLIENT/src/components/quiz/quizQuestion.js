import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from "@mui/material";
import { makeStyles, createStyles } from '@mui/styles';

import InfoIcon from '@mui/icons-material/Info';

const Styles = createStyles({
    main: {
        padding:"1rem",
        boxShadow:"0px 0px 10px 3px rgba(0,0,0,30%)",
        margin:"0.7rem 0.5rem",
        borderRadius:"15px",
    },
    formBox: {
        display:"flex",
        flexDirection:"column",
        gap:"0.5rem",
        margin:"0.2rem"
    },
    formGroup: {
        width:"100%",
        display:"grid",
        gridTemplateColumns:"49.5% 49.5%",
        gridTemplateRows:"100%",
        gridGap:"1%"
    },
    controls: {
        display:"flex",
        flexDirection:"row-reverse",
        gap:"15px",
        padding:"0.4rem"
    },
    note: {
        display:'flex',
        flex:"1",
        flexDirection:"row",
        gap:"5px",
        alignItems:"center"
    }
});

const useStyles = makeStyles(Styles);

const QuizQuestion = (props) => {
    const classes = useStyles();
    const { callback, index, question } = props; 

    const [prompt, setPrompt] = useState("");
    const [answerOne, setAnswerOne] = useState("");
    const [answerTwo, setAnswerTwo] = useState("");
    const [answerThree, setAnswerThree] = useState("");
    const [answerFour, setAnswerFour] = useState("");
    const [answerCorrect, setAnswerCorrect] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [disabled, setDisabled] = useState(false);

    const checkErrors = () => {
        if(prompt === "" || answerOne === "" || answerTwo === "" || answerCorrect === ""){
            setErrorMsg("Prompt, answers 1 & 2 and the Correct answer cannot be empty.");
            return true;
        }
    }

    const clearContents = () => {
        setPrompt("");
        setAnswerOne("");
        setAnswerTwo("");
        setAnswerThree("");
        setAnswerFour("");
        setAnswerCorrect("");
    }

    const parentCallback = () => {
        setErrorMsg("");
        if(checkErrors()) return;
        else {
            setDisabled(true);
            callback({ prompt, answerOne, answerTwo, answerThree, answerFour, answerCorrect });
        }
    }

    useEffect(()=>{
        if(question) {
            setPrompt(question.prompt);
            setAnswerOne(question.answer1);
            setAnswerTwo(question.answer2);
            setAnswerThree(question.answer3);
            setAnswerFour(question.answer4);
            setAnswerCorrect(question.correct_answer);
            setDisabled(true);

        }
    },[])

    return (
        <Box className={ classes.main }>
            <Box className={ classes.formBox }> 
                <Typography variant="h6"> Question { index + 1 } </Typography>
                <Typography component="span" className={classes.note} color="error" variant="p"> { errorMsg ? <InfoIcon />:"" } { errorMsg } </Typography>
                <TextField disabled={disabled} value={prompt} onChange={(e)=>{setPrompt(e.target.value)}} placeholder="Question Prompt"/>
                <Box className={classes.formGroup}> 
                    <TextField disabled={disabled} value={answerOne} onChange={(e)=>{setAnswerOne(e.target.value)}} placeholder="Answer 1"/>
                    <TextField disabled={disabled} value={answerTwo} onChange={(e)=>{setAnswerTwo(e.target.value)}} placeholder="Answer 2"/>
                </Box>
                <Box className={classes.formGroup}> 
                    <TextField disabled={disabled} value={answerThree} onChange={(e)=>{setAnswerThree(e.target.value)}} placeholder="Answer 3"/>
                    <TextField disabled={disabled} value={answerFour} onChange={(e)=>{setAnswerFour(e.target.value)}} placeholder="Answer 4"/>
                </Box>
                <TextField disabled={disabled} value={answerCorrect} onChange={(e)=>{setAnswerCorrect(e.target.value)}} placeholder="Correct Answer"/>
            </Box>
            <Box className={ classes.controls}>
                <Button disabled={disabled} variant="contained" onClick={clearContents} color="error" size="large">Clear Contents</Button>
                <Button disabled={disabled} variant="contained" onClick={parentCallback} size="large">Save Question</Button>
                <Typography className={classes.note} variant="p">
                    <InfoIcon color="primary" /> 
                    Note: You can leave Answers 3 & 4 empty if the question has only two answers such as true or false.
                </Typography>
            </Box>
        </Box>
    );
}
 
export default QuizQuestion;