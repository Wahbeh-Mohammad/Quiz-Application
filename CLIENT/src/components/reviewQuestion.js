import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const Styles = (theme) => createStyles({
    main:{
        display:"flex",
        flexDirection:"column",
        height:"100%",
        padding:"1.5rem 1rem",
        borderRadius:"15px",
        boxShadow:"0px 0px 10px 1px rgba(0,0,0, 30%)",
        transition:"0.3s"
    },
    green:{
        background:"green",
        color:"white"
    },
    red:{
        background:"red",
        color:"white"
    }
});

const useStyles = makeStyles(Styles);

const ReviewQuestion = (props) => {
    const classes = useStyles();

    const { prompt, userAnswer, correctAnswer, num} = props;
    const [background, setBackground] = useState(); // true = green, false = red

    useEffect(()=> {
        if(userAnswer.toString() === correctAnswer.toString()) setBackground(true);
        else setBackground(false);
    })

    return (
        <Box className={ [classes.main, background ? classes.green : classes.red] }>
            <Typography variant="h5">Q{ num } : { prompt }</Typography>
            <Typography variant="h5">You Answered : { userAnswer }</Typography>
            <Typography variant="h5">Correct Answer : { correctAnswer }</Typography>
        </Box>
    );
}
 
export default ReviewQuestion;