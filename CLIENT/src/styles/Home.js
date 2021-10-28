import { createStyles } from "@mui/styles";

const Styles = (theme) => createStyles({
    landing: {
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        padding:"1.2rem 2rem"
    },
    landingText: {
        maxWidth:"40%",
        maxHeight:"60%",
        height:"100%",
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-evenly",
        [theme.breakpoints.down(700)]: {
            maxWidth:"90%",
            maxHeight:"100%"
        }
    },
    img: {
        maxHeight:"75%",
        maxWidth:"100%",
        [theme.breakpoints.down(700)]: {
            display:"none"
        }
    },
    margin: {
        margin:"0.5rem 0rem"
    },
    center: {
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    actions:{
        display:'flex',
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        width:"100%",
        gap:"1rem"
    }
});

export default Styles;