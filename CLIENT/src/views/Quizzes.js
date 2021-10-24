import React, { useState, useEffect  } from "react";
import verifyToken from "../Utils/verificationUtils";
import HomeQuiz from "../components/homeQuiz";
import { createStyles, makeStyles } from "@mui/styles";
import { Typography, Box, Button, TextField, Divider, Select, MenuItem, InputLabel, FormGroup, Grid } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const Styles = (theme) => createStyles({
    main: {
        display:"grid",
        gridTemplateColumns:"15% 85%",
        [theme.breakpoints.down(1250)]: {
            gridTemplateColumns:"20% 80%"
        },
        [theme.breakpoints.down(900)]: {
            gridTemplateColumns:"30% 70%"
        },
        [theme.breakpoints.down(600)]: {
            gridTemplateColumns:"40% 60%"
        }
    },
    gridPad: {
        padding:"2rem 2rem"  
    },
    Sidebar: {        
        borderRight:`2px solid ${theme.palette.primary.main}`
    },
    pad: {
        display:"flex",
        flexDirection:"column",
        padding:"1rem 1rem",
        gap:"1rem"
    },
    padY: {
        padding:"1rem 0rem"
    },
    alignSelf: {
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        alignSelf:"center"
    },
    img: {
        maxHeight:"50%",
        maxWidth:"50%"
    },
    btn: {
        margin:"1rem 0rem"
    },
    view: {
        height:"100%",
        display:'flex',
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },
    scrollable: {
        overflowY:"scroll",
        overflowX:"hidden"
    }
});

const useStyles = makeStyles(Styles);

const Quizzes = (props) => {
    const classes = useStyles();

    const [authorized, setAuthorized] = useState(false);
    const [username, setUsername] = useState("");
    const [rank, setRank] = useState("");
    const [quizzes, setQuizzes] = useState([]);

    // Filter States
    const [quizName, setQuizName] = useState("");
    const [category, setCategory] = useState("None");

    const filter = () => {
        console.log("filter boah");
    }

    const parseUser = (data) => {
        setUsername(data.username);
        setRank(data.type);
    }

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_URL}quiz/`, {
                    method:"GET",
                    mode:"cors",
                    credentials:"include",
                    headers: {
                        'Access-Control-Allow-Origin':"http://localhost:3001"
                    }
                });
    
                const data = await res.json();
                if(data.status && data.quizzes) {
                    setQuizzes(data.quizzes);
                }
            } catch( err ) {
                console.log(err);
            }
        }

        verifyToken().then(({status, Token}) => {
            if(status) {
                setAuthorized(true);
                parseUser(Token);
            } else {
                setAuthorized(false);
            }
        }).catch((e) => {
            console.log(e);
        });
        fetchQuizzes();
    }, [authorized]);
    
    return ( 
        <Box className={ classes.main }>
            <Box className={ [classes.Sidebar, classes.padY] }>
                <Box className={ [classes.UserInfo, classes.pad ] }>
                    { authorized && <Box>
                        <Typography gutterBottom variant="h5">Hello, { username }!</Typography>
                        <Typography gutterBottom variant="h5">Rank : { rank }</Typography>
                    </Box> }
                    { !authorized &&
                        <Typography gutterBottom variant="h5" color="primary">Please Login to Attempt any Quiz</Typography>
                    }
                </Box>
                <Divider />
                <Box className={classes.pad}>
                    <Typography className={classes.alignSelf}  gutterBottom variant="h4">Filter <FilterAltIcon color="primary" className={classes.alignSelf} fontSize="large"/> </Typography>
                    <TextField sx={{ minWidth:"100%" }} onChange={(e)=>{setQuizName(e.target.value)}} placeholder="Quiz Name" />
                    <FormGroup>    
                        <InputLabel id="category"> Category </InputLabel>
                        <Select labelId="category" label="Category" value={category} onChange={(e) => {setCategory(e.target.value)}}>
                            <MenuItem value={"MATH"}>MATH</MenuItem>
                            <MenuItem value={"PHYSICS"}>PHYSICS</MenuItem>
                            <MenuItem value={"GEOGRAPHY"}>GEOGRAPHY</MenuItem>
                            <MenuItem value={"MISC"}>MISC</MenuItem>
                            <MenuItem value={"None"}>None</MenuItem>
                        </Select>
                    </FormGroup>
                    <Button variant="contained" className={classes.btn} size="large" onClick={()=>{filter();}}>Filter</Button>
                </Box>
            </Box>
            <Box className={classes.scrollable}>
                { (quizzes.length > 0) && <Grid container className={ classes.gridPad} spacing={2}>
                    { quizzes.map((quiz, index) => {
                        return <Grid key={index} item xs={12} sm={12} md={6} lg={4} xl={3}>
                                    <HomeQuiz key={quiz.quiz_id} Quiz={quiz} />
                                </Grid>
                        })
                    }
                </Grid>}
                { (quizzes.length === 0) && <Box className={classes.view}>
                        <Typography variant="h4">No quizzes yet :(</Typography>
                        <img src="profile.png" className={classes.img}/>
                    </Box> }
            </Box>
        </Box>
    );
}
 
export default Quizzes;