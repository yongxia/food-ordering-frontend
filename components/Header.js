import { useContext } from 'react'
import { fade, makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    InputBase,
    Link
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import NextLink from 'next/link'

import { AppContext } from './layout'
import { logout } from '../lib/auth'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    }

}));

export default function AppHeader() {
    const classes = useStyles();

    const { query, setQuery, show, user, setUser } = useContext(AppContext);

    const handleChange = (value) => {
        setQuery(value);
    }

    const handleClickLogout = () => {
        logout();
        setUser(null);
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <div className={classes.root} >
                    <NextLink href="/">
                        <Typography variant="h6" className={classes.title}><Link href="#" color="inherit">Home</Link></Typography>
                    </NextLink>
                </div>
                {show &&
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            value={query}
                            onChange={e => handleChange(e.target.value.toLowerCase())}
                        />
                    </div>
                }
                {user ?
                    <>
                        {`Hello ${user}`}
                        <Button className={classes.sign} color="inherit" onClick={handleClickLogout}>Logout</Button>
                    </>
                    :
                    <NextLink href="/login">
                        <Button className={classes.sign} color="inherit">Sign In</Button>
                    </NextLink>
                }
            </Toolbar>
        </AppBar >
    );
}
