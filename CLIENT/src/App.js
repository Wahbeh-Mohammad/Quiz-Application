import { Header, Footer } from './components/partials/index'; // Partials
import { Home, Login, Signup, CreateQuiz, Profile, Quiz, Quizzes, NotFound } from './views/index'; // Views
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles'
import { createStyles, makeStyles } from '@mui/styles';

import "./styles/shared.css";

require("dotenv").config();

const theme = createTheme();
const Styles = (theme) => createStyles({
  App: {
    height:"100%",
    display:"grid",
    gridTemplateRows:"auto 80% auto",
    overflowX:"hidden"
  },
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: "#3653c0",
      border:"1px solid #3653c0",
      borderRadius:"15px"
    }
  }
});
const useStyles = makeStyles(Styles);

const App = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.App}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/quizzes" component={Quizzes} />
            <Route exact path="/createQuiz" component={CreateQuiz} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/quiz/:quiz_id" component={Quiz} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
