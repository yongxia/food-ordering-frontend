import Head from './header'
import Footer from './footer'
import Meta from './meta'
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        height: '80vh',
        color: theme.palette.text.secondary,
    },
}));

const Layout = ({ children }) => {
    const classes = useStyles();

    return (
        <Container maxWidth="lg">
            <Meta />
            <Head />
            <br />
            <Grid container >
                <Grid item xs={12}>
                    <Paper elevation={0} className={classes.paper}>
                        <main>{children}</main>
                    </Paper>
                </Grid>
            </Grid>
            <br />
            <Footer />
        </Container>
    )
};

export default Layout;