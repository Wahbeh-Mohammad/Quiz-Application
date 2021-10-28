import { createStyles } from "@mui/styles"

const Styles = (theme) => createStyles({
    main: {
        padding:"1rem",
        height:"100%",
        display:"grid",
        gridTemplateRows:"10% 85% 5%"
    },
    stepper: {
        margin:"0rem 3rem"
        
    },
    stepperControls: {
        margin:"0rem 5rem",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    scrollable:{
        overflowY:"scroll"
    },
    quizBlock: {
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        margin:"0rem 25rem",
        gap:"25px",
        [theme.breakpoints.down(1200)]: {
            margin:"0rem 20rem"
        },
        [theme.breakpoints.down(950)]: {
            margin:"0rem 10rem"
        },
        [theme.breakpoints.down(600)]: {
            margin:"0rem 5rem"
        }
    }, 
    questionsBlock: {
        display:"grid",
        gridTemplateColumns:"49.5% 49.5%",
        gridGap:"1%"
    },
    submitBlock:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        gap:"0.5rem"
    }
});

export default Styles;