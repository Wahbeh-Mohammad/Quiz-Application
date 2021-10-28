import { createStyles } from "@mui/styles";

const Styles = (theme) => createStyles({
    main: {
        display:"grid",
        gridTemplateColumns:"50% 50%",
        margin:"2% 10%",
        boxShadow:"0px 0px 5px 5px rgba(0,0,0,30%)",
        borderRadius:"15px",
        [theme.breakpoints.down(900)]: {
            display:"block",
            height:"100%",
            boxShadow:"none"
        },
        [theme.breakpoints.down(600)]: {
            margin:"0%"
        }
    },
    svgBox:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    svg: {
        maxHeight:"75%",
        maxWidth:"75%"
    },
    center:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        background: theme.palette.primary.main,
        border:`2px solid ${theme.palette.primary.main}`,
        borderTopRightRadius:"15px",
        borderBottomRightRadius:"15px",
        color:"white"
    },
    form: {
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        borderTopLeftRadius:"15px",
        borderBottomLeftRadius:"15px",
        [theme.breakpoints.down(900)]: {
            borderRadius:"15px",
            padding:"2rem 0rem",
            height:"100%"
        },
        [theme.breakpoints.down(600)]: {
            border:"none",
            height:"100%",
            boxShadow:"none"
        }
    },
    formGroup: {
        display:"flex",
        flexDirection: "column",
        justifyContent:"center",
        alignItems:"center",
        margin: "1rem 0rem",
        width:"100%",
    },
    Input: {
        width:"80%",
        [theme.breakpoints.down(600)]: {
            width:"100%"
        }
    },
    adjustTexth2: {
        fontSize:"3rem",
        [theme.breakpoints.down(1250)]: {
            fontSize:"2.5rem"
        }
    },
    adjustTexth3: {
        fontSize:"2rem",
        [theme.breakpoints.down(1250)]: {
            fontSize:"1.5rem"
        }
    },
    hide: {
        [theme.breakpoints.down(900)]: {
            display:"none"
        }
    }
});

export default Styles;