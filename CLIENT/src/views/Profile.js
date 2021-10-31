import { useEffect, useState } from "react";
import ProfileQuiz from "../components/profile/profileQuiz";
import ProfileAttempt from '../components/profile/profileAttempt';
import verifyToken from "../Utils/verificationUtils";
import { Box, Typography, List, ListItemButton, ListItemIcon, ListItemText, Divider, Grid, Button, TextField, Alert } from '@mui/material';
import { Dialog, DialogActions, DialogTitle, DialogContent } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SettingsIcon from '@mui/icons-material/Settings';
import QuizIcon from '@mui/icons-material/Quiz';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import InfoIcon from '@mui/icons-material/Info';
import Styles from "../styles/Profile";
import utils from "../Utils/authUtils";
import Cookies from "universal-cookie";

const { checkPassword } = utils;

const useStyles = makeStyles(Styles);

const Profile = (props) => {
    const classes = useStyles();
    const cookie = new Cookies();

    // User's Data
    const [authorized, setAuthorized] = useState(false);
    const [username, setUsername] = useState("");
    const [rank, setRank] = useState("");
    const [hasQuizzes, setHasQuizzes] = useState(false);
    const [hasAttempts , setHasAttempts] = useState(false);
    const [quizzes, setQuizzes] = useState([]);
    const [attempts, setAttempts] = useState([]);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [updated, setUpdated] = useState("");
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

    // Settings handles

    const handleUpdateProfile = async()=>{
        setPasswordError("");
        console.log(newPassword, confirmPassword)
        if(!checkPassword(newPassword)){
            setPasswordError("New password is invalid, must be of length 8 & up, contain at least a symbol & a capital letter.");
            return;
        }
        if(newPassword !== confirmPassword){
            setPasswordError("New Password and confirm new password do not match.");
            return;
        }

        try {
            const putBody = { oldPassword, newPassword };
            console.log(putBody);
            const res = await fetch(`${process.env.REACT_APP_API_URL}update`, {
                method:"PUT",
                mode:"cors",
                credentials:"include",
                headers: {
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin':"http://localhost:3001"
                },
                body: JSON.stringify(putBody)
            });

            const data = await res.json();
            console.log(data);
            if(data.status) {
                setUpdated(true);
            } else {
                setPasswordError(data.Error.message)
            }
        } catch( err ) {
            console.log(err);
        }
    }

    const handleDeleteAccount = async()=>{
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}delete`, {
                method:"DELETE",
                mode:"cors",
                credentials:"include",
                headers: {
                    'Access-Control-Allow-Origin':"http://localhost:3001"
                }
            });

            const data = await res.json();
            console.log(data);
            if(data.status) {
                console.log("Deleted");
                cookie.set('jwt', "", { maxAge:1, path:"/" });
                setAuthorized(false);
                window.location.assign("/");
            }
        } catch( err ) {
            console.log(err);
        }
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
                    { currentView === "Settings" && <Box className={[classes.pad, classes.gap]}> 
                        <Typography variant="h4"> Name Settings </Typography>
                        <Divider />
                        <Box className={classes.gap}> 
                            <Box className={classes.row}>
                                <Typography variant="h6"> Username: </Typography>
                                <TextField value={ username } disabled size="small"></TextField>
                            </Box>
                            <Box className={classes.row}>
                                <InfoIcon color="error"/> <Typography variant="p"> Since usernames are unique, You cannot Change your username. </Typography>
                            </Box>
                        </Box>
                        <Divider />
                        <Typography variant="h4"> Password Settings </Typography>
                        <Box className={classes.gap}>
                            <Box className={classes.row}> 
                                <Typography variant="h6" > Old password: </Typography>
                                <TextField onChange={(e) => {setOldPassword(e.target.value)}} size="small" />
                            </Box> 
                            <Box className={classes.row}> 
                                <Typography variant="h6" > New password: </Typography>
                                <TextField onChange={(e) => {setNewPassword(e.target.value)}} size="small" />
                            </Box> 
                            <Box className={classes.row}> 
                                <Typography variant="h6"> Confirm new password: </Typography>
                                <TextField onChange={(e)=>{setConfirmPassword(e.target.value)}} size="small" />
                            </Box> 
                            <Box className={classes.row}>
                                <Button variant="contained" onClick={()=>{handleUpdateProfile()}}> Update Password </Button> 
                                { passwordError && <Box className={classes.row}><InfoIcon color="error"/> <Typography color="error" variant="p"> { passwordError } </Typography> </Box>}
                                { updated && <Alert severity="success">Password Updated!</Alert>}
                            </Box>
                        </Box>
                        <Divider />
                        <Typography variant="h4"> Account Deletion </Typography>
                        <Box className={classes.gap}>
                            <Box className={classes.row}>
                                <InfoIcon color="error"/> 
                                <Typography variant="p"> 
                                    Be careful, once you delete your account, you cant get it back!.
                                </Typography>
                            </Box>
                            <Box>
                                <Button color="error" variant="contained" onClick={()=>{handleDeleteAccount()}}> Delete Account </Button>
                            </Box>
                        </Box>
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