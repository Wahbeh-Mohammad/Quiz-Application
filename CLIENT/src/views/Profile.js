import { useEffect, useState } from "react";
import ProfileQuiz from "../components/profileQuiz";
import ProfileAttempt from '../components/profileAttempt';
import verifyToken from "../Utils/verificationUtils";
import { Box, Typography, List, ListItemButton, ListItemIcon, ListItemText, Divider, Grid, Button } from '@mui/material';
import { Dialog, DialogActions, DialogTitle, DialogContent } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import SettingsIcon from '@mui/icons-material/Settings';
import QuizIcon from '@mui/icons-material/Quiz';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const Styles = (theme) => createStyles({
    main: {
        display:"grid",
        gridTemplateColumns:"15% 85%",
    },
    Sidebar: {        
        borderRight:`2px solid ${theme.palette.primary.main}`
    },
    Userinfo: {
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        padding:"1rem 0rem"
    },
    pad: {
        padding:"1rem 1rem"
    },
    padY: {
        padding:"1rem 0rem"
    },
    gridPad: {
        padding:"2rem 2rem"  
    },
    List:{
        width:"100%"
    },
    View: {
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },
    svgBox:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    img: {
        maxHeight:"70%",
        maxWidth:"70%"
    },
    overflow: {
        overflowX:"hidden",
        overflowY:"scroll"
    },
    fullWidth:{
        width:"100%"
    },
    spanner:{
        columnSpan:"all"
    }
});

const useStyles = makeStyles(Styles);

const Profile = (props) => {
    const classes = useStyles();

    // User's Data
    const [authorized, setAuthorized] = useState(false);
    const [username, setUsername] = useState("");
    const [rank, setRank] = useState("");
    const [hasQuizzes, setHasQuizzes] = useState(false);
    const [hasAttempts , setHasAttempts] = useState(false);
    const [quizzes, setQuizzes] = useState([]);
    const [attempts, setAttempts] = useState([]);

    // Conditional outputs
    const [currentView, setCurrentView] = useState("Quizzes");
    const [open, setOpen] = useState(false);

    const parseUser = (data) => {
        setUsername(data.username);
        setRank(data.type);
    }

    const handleRedirect = () => {
        setOpen(false);
        window.location.assign("/login");
    }

    const handleDialogClose = ()=> {
        setOpen(false);
        window.location.assign("/");
    }

    useEffect(()=>{
        const fetchQuizzes = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_URL}quiz/user`, {
                    method:"GET",
                    mode:"cors",
                    credentials:"include",
                    headers: {
                        'Access-Control-Allow-Origin':"http://localhost:3001"
                    }
                });
    
                const data = await res.json();
                if(data.status && data.quizzes.length > 0) {
                    setHasQuizzes(true);
                    setQuizzes(data.quizzes);
                } else if(data.status && !data.quizzes.length === 0) {
                    setHasQuizzes(false);
                } else {
                    console.log(data.Errors);
                }
            } catch( err ) {
                console.log(err);
            }
        }
        const fetchAttempts = async()=>{
            try {
                const res = await fetch(`${process.env.REACT_APP_API_URL}attempt/`, {
                    method:"GET",
                    mode:"cors",
                    credentials:"include",
                    headers: {
                        'Access-Control-Allow-Origin':"http://localhost:3001"
                    }
                });
    
                const data = await res.json();
                if(data.status && data.attempts.length > 0) {
                    setHasAttempts(true);
                    setAttempts(data.attempts);
                } else if(data.status && data.attempts.length === 0) {
                    setHasAttempts(false);
                } else {
                    console.log(data);
                }
            } catch( err ) {
                console.log(err);
            }
        }

        const main = async () => {
            verifyToken().then(({status, Token}) => {
                if(status){
                    setAuthorized(true);
                    parseUser(Token);
                } else {
                    setAuthorized(false);
                    setOpen(true);
                }
            });
        }

        main();
        if(authorized){
            fetchQuizzes();
            fetchAttempts();
        }
    }, [authorized]);

    return (
        <Box className={classes.main}>
            { authorized && <>
                <Box className={[ classes.Sidebar, classes.padY]}>
                    <Box className={classes.Userinfo}>
                        <Typography variant="h4">Welcome, { username }</Typography>
                        <Typography variant="h6"> { rank } </Typography>
                    </Box>
                    <Divider />
                    <List className={classes.List}>
                        <ListItemButton onClick={ () => setCurrentView("Quizzes")}>
                            <ListItemIcon> <MenuBookIcon color="primary" /> </ListItemIcon>
                            <ListItemText> My Quizzes </ListItemText>
                        </ListItemButton>
                        <ListItemButton onClick={() => setCurrentView("Attempts")}>
                            <ListItemIcon> <QuizIcon color="primary" /> </ListItemIcon>
                            <ListItemText> My Attempts </ListItemText>
                        </ListItemButton>
                        <ListItemButton onClick={() => setCurrentView("Settings")}>
                            <ListItemIcon> <SettingsIcon color="primary" /> </ListItemIcon>
                            <ListItemText> Settings </ListItemText>
                        </ListItemButton>
                    </List>
                </Box>
                <Box className={classes.overflow}>
                    {/* Quizzes */}
                    { ((currentView === "Quizzes") && (hasQuizzes)) && <Grid className={classes.gridPad} container spacing={2} >
                        { 
                            quizzes.map((quiz) => {
                                return  <Grid key={quiz.quiz_id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                                            <ProfileQuiz Quiz={quiz} /> 
                                        </Grid>
                            })
                        }
                    </Grid> }
                    { ((currentView === "Quizzes") && (!hasQuizzes)) && <Box>
                        <Typography variant="h4">You have no Quizzes!</Typography>
                        <img src="profile.png" className={classes.img}/>
                    </Box> }

                    {/* Attempts */}
                    { ((currentView === "Attempts") && (hasAttempts)) && <Box>
                        { 
                            attempts.map((attempt, index) => {
                                return <ProfileAttempt key={index} attemptNum={index+1} attempt={attempt} />
                            })
                        }
                    </Box> }
                    { ((currentView === "Attempts") && (!hasAttempts)) && <Box>
                        <Typography variant="h4">You haven't attempted any quizzes!</Typography>
                        <img src="profile.png" className={classes.img}/>
                    </Box> }
                    
                    {/* Settings */}
                    { currentView === "Settings" && <Box className={classes.pad}> 
                        <Typography variant="h3"> Settings </Typography>
                    </Box>}
                </Box>
            </> }
            {!authorized && <Dialog open={open} className={[classes.View, classes.pad, classes.fullWidth, classes.spanner]}>
                                <DialogContent>
                                    <DialogTitle>
                                        <Typography variant="h6">Please login to view your Profile.</Typography>
                                    </DialogTitle>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => {handleDialogClose();}} variant="outlined">Cancel</Button>
                                    <Button onClick={() => {handleRedirect();}} variant="contained">Login</Button>
                                </DialogActions>
                            </Dialog>
            }
        </Box>
    );
}
 
export default Profile;