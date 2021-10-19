import React from "react";
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { createStyles, makeStyles } from "@mui/styles";
import { Link } from 'react-router-dom';

const Styles = (theme) => createStyles({
    main:{
        height:"100%",
        display:'flex',
        flexDirection:"column"
    },
    flex:{
        flex:"1"
    },
    textDecoration:{
        textDecoration:"none"
    }
});

const useStyles = makeStyles(Styles);

const HomeQuiz = (props) => {
    const classes = useStyles();
    const { quiz_id, quiz_name, category, marks, difficulty, num_questions } = props.Quiz;
    
    return (
        <Card raised className={classes.main}>
            <CardActionArea className={classes.flex}>
                <CardMedia> 
                    <img src={`${category}.jpg`} alt={`${category}`} width="100%"/>
                </CardMedia>
                <CardContent>
                    <Typography> Quiz :  { quiz_name } </Typography>
                    <Typography> Category : { category } </Typography>
                    <Typography> Out of : { marks } </Typography>
                    <Typography> Number of Questions :{ num_questions } </Typography>
                    <Typography> Difficulty : { difficulty } </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Link className={classes.textDecoration} to={`/quiz/${quiz_id}`}><Button variant="contained">Attempt Quiz</Button></Link>
            </CardActions>
        </Card>
    );
}
 
export default HomeQuiz;