import React, { useState } from 'react';
import { Box, Typography, RadioGroup, Radio, FormControlLabel, Button } from '@mui/material';
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
    customBS: {
        boxShadow:"0px 0px 10px 1px rgba(255,152,0, 100%)"
    },
    flexOne:{
        flex:"1"
    },
    Controls:{
        display:"flex",
        flexDirection:"row",
        gap:"1rem",
        justifyContent:'center',
        alignItems:"center"
    }
});

const useStyles = makeStyles(Styles);

const AttemptQuestion = (props) => {
    const classes = useStyles();

    const { prompt, answer1, answer2, answer3, answer4 } = props.question;
    const { parentCallback, num } = props; 

    const [chosen, setChosen] = useState("");
    const [custom, setCustom] = useState(false);

    const handleChange= (value) => {
        setChosen(value);
        parentCallback(prompt, value);
    }

    const clearAnswer = () => {
        setChosen("");
    }

    return (
        <Box className={ [classes.main, custom ? classes.customBS : null] }>
            <Box className={classes.flexOne}>
                <Typography variant="h5">Q{ num } : { prompt }</Typography>
                <RadioGroup value={chosen} id={`answer`} onChange={e => {handleChange(e.target.value);}}>
                    <FormControlLabel value={answer1} control={<Radio />} label={answer1} />
                    <FormControlLabel value={answer2} control={<Radio />} label={answer2} />
                    {answer3 && <FormControlLabel value={answer3} control={<Radio />} label={answer3} />}
                    {answer4 && <FormControlLabel value={answer4} control={<Radio />} label={answer4} />}
                    {/* <FormControlLabel value={null} control={<Radio hidden />} /> */}
                </RadioGroup>
            </Box>
            <Box className={classes.Controls}>
                <Button variant="contained" color="warning" onClick={ () => setCustom(!custom)  }> { custom ? "Unmark unknown":"Mark unknown"} </Button>
                <Button variant="contained" color="error" onClick={ () => {clearAnswer()}}> Clear Answer </Button>
            </Box>
        </Box>
    );
}
 
export default AttemptQuestion;