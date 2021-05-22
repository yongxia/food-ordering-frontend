import { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { AppContext } from '../components/layout';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function Cart() {
    const classes = useStyles();
    const { cart } = useContext(AppContext);

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Orders:
                 </ListSubheader>
            }
            className={classes.root}
        >
            {
                cart.map((c, index) => (
                    <ListItem key={index}>
                        <ListItemText>{c.name}, {c.price}</ListItemText>
                    </ListItem>
                ))
            }
            <ListItem>
                <ListItemText>Total: $0</ListItemText>
            </ListItem>

        </List>
    );
}
