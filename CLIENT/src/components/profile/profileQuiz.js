import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

const ProfileQuiz = (props) => {

    const { quiz_id, quiz_name, category, marks, difficulty, num_questions } = props.Quiz;
    const [quizName, setQuizName] = useState();

    const handleDeleteQuiz = async () => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}quiz/${quiz_id}`, {
            method:"DELETE",
            mode:"cors",
            credentials:"include",
            headers: {
                'Access-Control-Allow-Origin':"http://localhost:3001"
            }
        });
        const data = await res.json();
        if(data.status) {
            console.log("Quiz Deleted!");
        } else {
            console.log("Something Went Wrong!");
        }
    }

    useEffect(()=> {
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
    }, []);

    return (
        <Card raised>
            <CardActionArea>
                <CardMedia component="img" height="300" image={`${category}.jpg`} alt={`${category}`} />
                <CardContent>
                    <Typography gutterBottom variant="h4" component="div"> { quiz_name } </Typography>
                    <Typography gutterBottom variant="h6"> { category } </Typography>
                    <Typography gutterBottom variant="h6"> Marks : { marks } </Typography>
                    <Typography gutterBottom variant="h6"> Number of Questions : { num_questions } </Typography>
                    <Typography gutterBottom variant="h6"> Difficulty : { difficulty} </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button variant="outlined" onClick={ () => { console.log(`Edit Quiz ${quiz_id}`) } }>Edit Quiz</Button>
                <Button variant="contained" color="error" onClick={ ()=>{ handleDeleteQuiz(); } }>Delete Quiz</Button>
            </CardActions>
        </Card>
    );
}
 
export default ProfileQuiz;