// Utils
import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
// Components
import { Box, Typography } from '@mui/material';
// Icons
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Styles = ( theme ) => createStyles({
    footer:{
        [theme.breakpoints.down("md")]:{
            flexDirection:"column"
        },
        padding:"5px",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-evenly",
        alignItems: "center",
        backgroundColor: `#1565c0`
    },
    flexColumn:{
        disply:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center"
    },
    flexRow:{
        disply:"flex",
        flexDirection:"row"
    },
    Link: {
        textDecoration:"none",
        color:"white"   
    }, 
});

const useStyles = makeStyles(Styles);

const Footer = (props) => {
    const classes = useStyles();

    return (
    <footer className={classes.footer}>
            <Box className={classes.flexColumn}>
                <Typography component="div" variant="h6" color="white">
                    wahbehmo20@gmail.com
                </Typography>
            </Box>
            <Box className={ classes.flexColumn } backgroundColor="primary">
                <Box className={ classes.Links }> 
                    <a rel="noopener noreferrer" className={classes.Link} href="https://github.com/Wahbeh-Mohammad" target="_blank">
                        <GitHubIcon className={classes.Icon} fontSize="large" />
                    </a>
                    <a rel="noopener noreferrer" className={classes.Link} href="https://www.facebook.com/mohammad.wahbeh15/" target="_blank">
                        <FacebookIcon className={classes.Icon} fontSize="large" />
                    </a>
                    <a rel="noopener noreferrer" className={classes.Link} href="https://www.linkedin.com/in/mohammad-s-wahbeh-40219b187/" target="_blank">
                        <LinkedInIcon className={classes.Icon} fontSize="large" />
                    </a>
                </Box>   
            </Box>
            <Box className={classes.flexColumn}>
                <Typography component="div" variant="h6" color="white">
                    &copy; Mohammad S. Wahbeh
                </Typography>
            </Box>
        </footer>
    );
}
 
export default Footer;