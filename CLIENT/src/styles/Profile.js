import { createStyles } from "@mui/styles";

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
    },
    row: {
        display:'flex',
        flexDirection:"row",
        gap:"0.7rem",
        alignItems:"center"
    },
    gap: {
        display:"flex",
        flexDirection:"column",
        gap:"1rem"
    },
    smallerGap:{
        display:"flex",
        flexDirection:"column",
        gap:"0.5rem"
    }
});

export default Styles;