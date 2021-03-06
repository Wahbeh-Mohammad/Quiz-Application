import { useEffect, useState } from "react";
import verifyToken from "../Utils/verificationUtils";
import { Box, Typography, Button, FormControlLabel , TextField, Stepper, Step, StepLabel, FormGroup, FormControl, Snackbar, Alert } from "@mui/material";
import { Dialog, DialogActions, DialogTitle, DialogContent, Radio, RadioGroup, FormLabel } from "@mui/material";
import { makeStyles } from "@mui/styles";
import QuizQuestion from "../components/quiz/quizQuestion";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Styles from '../styles/CreateQuiz';

const useStyles = makeStyles(Styles);

const CreateQuiz = (props) => {
    const classes = useStyles();

    const handleRedirect = (to) => {
        window.location.assign(to);
    }

    // Dialog related
    const [open, setOpen] = useState(false);
    const handleDialogClose = () => setOpen(false);

    // Stepper related
    const steps = ["Quiz Details", "Quiz's Questions", "Submit New Quiz"];
    const [activeStep, setActiveStep] = useState(0);
    const [backStepActive, setBackStepActive] = useState(true);
    const [nextStepActive, setNextStepActive] = useState(false);
    const handleActivateDeactivate = (curStep) => {
        if(curStep === 0){
            setNextStepActive(false);
            setBackStepActive(true);
        } else if(curStep === 1){
            setNextStepActive(false);
            setBackStepActive(false);
        } else if(curStep === 2){
            setNextStepActive(true);
            setBackStepActive(false);
        }
    }
    const handleNext = () => {
        if(activeStep < 2) {
            setActiveStep(activeStep+1);
            handleActivateDeactivate(activeStep + 1);
        }
    }
    const handleBack = () => {
        if(activeStep > 0) {
            setActiveStep(activeStep-1);
            handleActivateDeactivate(activeStep-1);
        }
    }

    // Conditionals
    const [authorized, setAuthorized] = useState(false);

    // Quiz Details
    const [quiz_id, setQuizId] = useState(undefined);
    const [quiz_name, setQuizName] = useState("");
    const [category, setCategory] = useState("MISC");
    const [difficulty, setDifficulty] = useState(0);
    const [num_questions, setNumberOfQuestions] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const checkValues = ()=>{
        if(!quiz_name || !difficulty || questions.length != num_questions)return true;
    }

    const handleQuestionAdd = (question) => {
        const toSave = { prompt: question.prompt, 
                         answer1: question.answerOne,
                         answer2: question.answerTwo, 
                         answer3: question.answerThree, 
                         answer4: question.answerFour , 
                         correct_answer: question.answerCorrect };
        setQuestions([...questions, toSave]);
    }

    const postQuestion = async (quiz_id, question) => {
            const postBody = question;
            console.log("QUESTION: ",postBody);
            const res = await fetch(`${process.env.REACT_APP_API_URL}question/${quiz_id}`, {
                method:"POST",
                mode:"cors",
                headers: {
                    'Content-Type': "application/json",
                    'Access-Control-Allow-Origin':"http://localhost:3001"
                },
                body: JSON.stringify(postBody)
            });
            const data = await res.json();
    }

    const handleSubmit = async (e) => {
        setSnackbarOpen(false);
        if(checkValues()){
            setErrorMessage("You left a field empty.");
            setSnackbarOpen(true);
            return;
        }
        e.preventDefault();
        try {
            const postBody = { quiz_name, category, marks:num_questions, difficulty, num_questions };
            const res = await fetch(`${process.env.REACT_APP_API_URL}quiz/`, {
                method:"POST",
                mode:"cors",
                credentials:"include",
                headers: {
                    'Content-Type': "application/json",
                    'Access-Control-Allow-Origin':"http://localhost:3001"
                },
                body: JSON.stringify(postBody)
            });

            const data = await res.json();

            if(data.status) {
                const { quiz_id } = data;
                setQuizId(quiz_id);
                questions.forEach((question) => postQuestion(quiz_id, question));
                // window.location.assign(`/quiz/${quiz_id}`);
            } 
        } catch (er) {
            console.log(er);
        }
    }
    
    const runCallback = (cb) => {
        return cb();
    }

    useEffect( () => {
        verifyToken().then(({status, Token}) => {
            if(status) {
                setAuthorized(true);
            } else {
                setAuthorized(false);
                setOpen(true);
            }
        }).catch((e)=>{
            console.log(e);
        });
    },[ authorized ]);

    return (
        <Box>
            { authorized && 
                <Box className={classes.main}> 
                    <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={()=>{setSnackbarOpen(false)}}>
                        <Alert severity="error" sx={{width:"100%"}}>
                            { errorMessage }
                        </Alert>
                    </Snackbar>
                    <Stepper activeStep={activeStep} className={ classes.stepper }>
                        {steps.map((label) => {
                            return (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    { activeStep === 0 && 
                        <Box className={ classes.quizBlock }> 
                            <FormGroup>
                            <TextField value={quiz_name} onChange={ e=>setQuizName(e.target.value) } placeholder="Quiz name" />
                            </FormGroup>
                            <FormLabel component="legend"> Category </FormLabel>
                            <RadioGroup aria-label="Category" defaultValue="MISC" onChange={(e)=>{setCategory(e.target.value)}}> 
                                <FormControlLabel value="MISC" control={<Radio />} label="MISC" />
                                <FormControlLabel value="GEOGRAPHY" control={<Radio />} label="GEOGRAPHY" />
                                <FormControlLabel value="MATH" control={<Radio />} label="MATH" />
                                <FormControlLabel value="PHYSICS" control={<Radio />} label="PHYSICS" />
                            </RadioGroup>
                            <FormGroup> 
                                <TextField value={num_questions ? num_questions:""} onChange={ e=> setNumberOfQuestions(e.target.value) } placeholder="Number of Questions" />
                            </FormGroup>
                            <FormGroup> 
                                <TextField value={difficulty ? difficulty:""} onChange={ e=> setDifficulty(e.target.value) } placeholder="Difficulty" />
                            </FormGroup>
                        </Box>
                    }
                    { activeStep === 1 && 
                        <Box className={ [classes.questionsBlock, classes.scrollable] }> 
                            {
                                runCallback(()=>{
                                    const items = new Array();
                                    for(var i=0;i<num_questions; i++){
                                        items.push(i);
                                    }
                                    return items
                                }).map((item) => {
                                    if(questions[item]) return <QuizQuestion key={item} index={item} callback={handleQuestionAdd} question={questions[item]} />
                                    else return <QuizQuestion key={item} index={item} callback={handleQuestionAdd} />
                                })
                            }
                        </Box>
                    }
                    { activeStep === 2 && 
                        <Box className={ classes.submitBlock }> 
                            <Typography variant="h6"> Quiz :  { quiz_name } </Typography>
                            <Typography variant="h6"> Category : { category } </Typography>
                            <Typography variant="h6"> Number of Questions :{ num_questions } </Typography>
                            <Typography variant="h6"> Difficulty : { difficulty } </Typography>
                            <Button size="large" variant="contained" color="primary" onClick={handleSubmit}>Submit Quiz</Button>
                        </Box>
                    }
                    <Box className={ classes.stepperControls}>
                        <Button color="primary" variant="contained" startIcon={<ChevronLeftIcon />} 
                                disabled={backStepActive} onClick={ handleBack }>Previous</Button>
                        <Button color="primary" variant="contained" endIcon={<ChevronRightIcon />} 
                                disabled={nextStepActive} onClick={ handleNext }>Next</Button>
                    </Box>
                </Box>
            }

            { !authorized && <Dialog open={open} className={[classes.View, classes.pad, classes.fullWidth, classes.spanner]}>
                                <DialogContent>
                                    <DialogTitle>
                                        <Typography variant="h6">Please login to create Quizzes.</Typography>
                                    </DialogTitle>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => {handleDialogClose();}} variant="outlined">Cancel</Button>
                                    <Button onClick={() => {handleRedirect("/login");}} variant="contained">Login</Button>
                                </DialogActions>
                            </Dialog>
            }
        </Box>
    );
}
 
export default CreateQuiz;