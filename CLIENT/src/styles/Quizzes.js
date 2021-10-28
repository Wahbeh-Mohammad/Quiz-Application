import { createStyles } from "@mui/styles";

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

export default Styles;