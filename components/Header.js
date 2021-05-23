import { useContext } from 'react'
import { fade, makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    InputBase,
    Badge,
    IconButton,
    Link
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HomeIcon from '@material-ui/icons/Home';
import NextLink from 'next/link'

import { AppContext } from './layout'
import { logout } from '../lib/auth'

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    menuButton: {
        marginRight: theme.spacing(1),
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

const ShoppingCartLabel = props => (
    <NextLink href='/cart'>
        <IconButton aria-label="cart items" color="inherit">
            <Badge badgeContent={props.total} color="secondary">
                <ShoppingCartIcon />
            </Badge>
        </IconButton>
    </NextLink>
)

export default function AppHeader(props) {
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
                <NextLink href="/">
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="home"
                    >
                        <HomeIcon />
                    </IconButton>
                </NextLink>
                <NextLink href="/">
                    <Typography variant="h6" className={classes.title}><Link href="#" color="inherit">Home</Link></Typography>
                </NextLink>
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
                <div className={classes.grow}></div>
                {user ?
                    <>
                        {user}
                        <ShoppingCartLabel total={props.total} />
                        <Button className={classes.sign} color="inherit" onClick={handleClickLogout}>Logout</Button>
                    </>
                    :
                    <>
                        <ShoppingCartLabel total={props.total} />
                        <NextLink href="/login">
                            <Button className={classes.sign} color="inherit">Sign In</Button>
                        </NextLink>
                    </>
                }
            </Toolbar>
        </AppBar >
    );
}
