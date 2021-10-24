import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import verifyToken from "../Utils/verificationUtils";
import AttemptQuestion from "../components/attemptQuestion";
import ReviewQuestion from "../components/reviewQuestion";
import { Box, Typography, Grid, Button, Divider } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';

const Styles = theme => createStyles({
    main: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    quizLanding: {
        display: "flex",
        flexDirection: "column",
        gap: "15px"
    },
    quizDetails: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "5px"
    },
    quizStarted: {
        padding: "1.5rem",
        height: "100%",
        width: "100%",
        display:'flex',
        flexDirection:"column"
    },
    questionsControls: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'center',
        alignContent: 'center'
    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    flexOne: {
        flex: "1"
    },
    noDeco: {
        textDecoration:"none"
    },
    Finished: {
        height:"100%",
        width:"100%",
        padding:"1.5rem",
        display:'flex',
        flexDirection:"column",
        gap:"0.5rem"
    },
    scrollable: {
        overflowX:"hidden",
        overflowY:"scroll"
    },
    pad: {
        padding:"0.3rem"
    },
    cursor: {
        cursor:"pointer",
        textDecoration:"none"
    }
});

const useStyles = makeStyles(Styles);

const Quiz = (props) => {
    const classes = useStyles();
    const { quiz_id } = useParams(); // Quiz ID
    // Conditionals
    const [authorized, setAuthorized] = useState(false);
    const [quizFound, setQuizFound] = useState(false);
    const [currentBlock, setCurrentBlock] = useState(0);
    // User related
    const [username, setUsername] = useState("");
    const parseUser = (data) => {
        setUsername(data.username);
    }
    // Quiz related
    const [rawQuiz, setQuizRaw] = useState({});
    const [prompts, setPrompts] = useState(Array());
    const [rawQuestions, setQuestionsRaw] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState({});
    const [userAnswers, setUserAnswers] = useState({});
    const [numberOfQuestions, setNumberOfQuestions] = useState(0);
    const [score, setScore] = useState(0);

    const parseQuestionAnswers = (questions) => {
        questions.forEach((question) => {
            const { prompt } = question;
            prompts.push(prompt);
            setPrompts(prompts);
        });
    }

    const assignCorrectAnswer = (question, answer) => {
        correctAnswers[question.toString()] = answer;
        setCorrectAnswers(correctAnswers);
    }

    const parseCorrectAnswers = (questions) => {
        questions.forEach((question) => {
            const { prompt, correct_answer } = question;
            assignCorrectAnswer(prompt, correct_answer)
        })
    }

    const assignAnswer = (question, answer) => {
        userAnswers[question] = answer.toString();
        setUserAnswers(userAnswers);
    }

    const handleSubmit = () => {
        console.log(userAnswers);
        console.log(correctAnswers);
        const keys = Object.keys(correctAnswers);
        var Score = 0;
        keys.forEach( key => {
            try {
                const correctAns = correctAnswers[key].toString();
                const userAns = userAnswers[key].toString();
                if(correctAns === userAns){
                    Score++;
                }
            } catch (e) {
                if(!userAnswers) {
                    setScore(0);
                } else {
                    console.log(e);
                }
            }
        });
        setScore(Score);
        submitAttempt(Score);
        setCurrentBlock(2);
    }

    const submitAttempt = async (Score) => {
        try {
            const postBody = { quiz_id, Score }
            const res = await fetch(`${process.env.REACT_APP_API_URL}attempt/`, {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': "application/json",
                    'Access-Control-Allow-Origin': "http://localhost:3001"
                },
                credentials: 'include',
                body: JSON.stringify(postBody)
            });

            const data = await res.json();
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_URL}quiz/attempt/${quiz_id}`, {
                    method: "GET",
                    mode: "cors",
                    credentials: "include",
                    headers: {
                        'Access-Control-Allow-Origin': "http://localhost:3001"
                    }
                });

                const data = await res.json();
                if (data.status && data.quiz) {
                    setQuizFound(true);
                    setQuizRaw(data.quiz);
                    setQuestionsRaw(data.quiz.Questions);
                    setNumberOfQuestions(data.quiz.Questions.length);
                    parseQuestionAnswers(data.quiz.Questions);
                    parseCorrectAnswers(data.quiz.Questions);
                } else {
                    setQuizRaw(null);
                    setQuizFound(false);
                }
            } catch (err) {
                console.log(err);
            }
        }

        verifyToken().then(({status, Token}) => {
            if(status){
                setAuthorized(true);
            } else {
                setAuthorized(false);
            }
        }).catch((e) => {
            console.log(e);
        });
        fetchQuiz();
    }, []);

    return (
        <Box className={classes.main}>
            {/* Quiz Landing Block */}
            {(quizFound && currentBlock === 0) && <Box className={classes.quizLanding}>
                <Box className={classes.quizDetails}>
                    <Typography variant="h4" color="primary"> Quiz: {rawQuiz.quiz_name} </Typography>
                    <Typography variant="h5"> Category: {rawQuiz.category} </Typography>
                    <Typography variant="h5"> Number of Questions: {rawQuiz.num_questions} </Typography>
                    <Typography variant="h5"> Difficulty: {rawQuiz.difficulty} </Typography>
                    <Typography variant="h5"> Marks: {rawQuiz.marks} </Typography>
                </Box>
                {authorized && <Button variant="contained" onClick={() => { setCurrentBlock(1) }}>Attempt Quiz</Button>}
                {!authorized && <Box className={[classes.quizDetails]}>
                    <Button disabled variant="contained">Attempt Quiz</Button>
                    <Box className={classes.row}>
                        <InfoIcon color="error" /><Typography color="error"> You need to be logged in to attempt the quiz! </Typography>
                    </Box>
                </Box>}
            </Box>}

            {/* Quiz starts Block */}
            {(quizFound && currentBlock === 1) && <Box className={classes.quizStarted}>
                <Grid className={[classes.flexOne, classes.pad, classes.scrollable]} container spacing={2}>
                    {rawQuestions.map((question, index) => {
                        return <Grid key={index} xs={12} sm={12} md={6} lg={4} xl={3} item>
                            <AttemptQuestion num={index + 1} question={question} parentCallback={assignAnswer} />
                        </Grid>
                    })
                    }
                </Grid>
                <Box className={[classes.questionsControls, classes.row]}>
                    <Box className={classes.flexOne}>
                        <Typography>Number of answered Questions : {userAnswers.length ? userAnswers.length : 0} </Typography>
                    </Box>
                    <Button variant="contained" onClick={ handleSubmit }>Submit & Finish</Button>
                </Box>
            </Box>}
            {currentBlock === 2 && <Box className={classes.Finished}> 
                <Typography color={(score >= (numberOfQuestions/2)) ? "green" : "error"} variant="h3">
                    {score >= (numberOfQuestions/2) ? `Well Done! ${username} `:`Hard Luck! ${username} ` }you scored : { score } Out of { numberOfQuestions }
                </Typography>
                <Box className={classes.Review}>
                    <Typography variant="h4" color="primary">Review</Typography>
                    <Divider component="div"/>
                    <Grid className={[classes.scrollable, classes.pad]} spacing={2} container>
                        {rawQuestions.map((question, index) => {
                            const { prompt, correct_answer } = question;
                            return <Grid key={index} xs={12} sm={12} md={6} lg={4} xl={4} item>
                                <ReviewQuestion num={index + 1} prompt={prompt} userAnswer={userAnswers[prompt]} correctAnswer={correct_answer} />
                            </Grid>
                        })}
                    </Grid>
                </Box>
                <Box className={classes.noDeco}>
                    <Link className={[classes.noDeco, classes.cursor]} to="/quizzes"> <Button className={classes.noDeco} variant="outlined">Back to Quizzes</Button> </Link>
                </Box>
            </Box>}
            {!quizFound && <>Quiz not found!</>}
        </Box>
    );
}

export default Quiz;