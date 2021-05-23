import { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
    Box,
    Button,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    ButtonBase,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { AppContext } from '../components/layout';

const useStyles = makeStyles((theme) => ({
    image: {
        width: 128,
        height: 128,
        paddingRignt: 10
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

const CartItem = ({ item, cart, setCart }) => {
    const classes = useStyles();
    const { id, image, name, price, quitality } = item;

    const increase = () => {
        setCart(() => {
            item.quitality++;
            cart.total++;
            cart.amount += price;
            return { ...cart }
        });
    }

    const decrease = () => {
        setCart(() => {
            if (item.quitality == 1) {
                //cart size might change when click decreas, use findIndex
                let index = cart.items.findIndex(i => i.id == id);
                cart.items.splice(index, 1);
            } else {
                item.quitality--;
            }
            cart.total--;
            cart.amount -= price;
            return { ...cart }
        });
    }


    return (
        <List >
            <ListItem>
                <ListItemAvatar>
                    <Box m={2}>
                        <ButtonBase className={classes.image} >
                            <img className={classes.img} variant="square" alt={name} src={image ? `${process.env.NEXT_PUBLIC_API_URL}${image.url}` : '/default.png'} />
                        </ButtonBase>
                    </Box>
                </ListItemAvatar>
                <ListItemText
                    primary={name}
                    secondary={<><p>Price: ${price}</p><p>Qty: {quitality}</p></>}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="increase" onClick={increase} >
                        <AddIcon color="primary" />
                    </IconButton>
                    <IconButton edge="end" aria-label="decrease" onClick={decrease}>
                        <RemoveIcon style={{ color: "red" }} />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </List>
    )
}

export default function Cart() {
    const classes = useStyles();
    const { cart, setCart } = useContext(AppContext);

    return cart.total === 0 ?
        <div style={{ textAlign: "center" }}>
            <Typography variant="h4">Cart</Typography>
            <Typography variant="body1" color="textSecondary" >
                Your cart is empty
                </Typography>
        </div>
        :
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Total Items</TableCell>
                        <TableCell align="right">Total Amount</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key={1}>
                        <TableCell align="right">{cart.total}</TableCell>
                        <TableCell align="right">${Math.round(cart.amount * 100) / 100}</TableCell>
                        <TableCell align="right">
                            <Button variant="outlined" color="primary" href="#outlined-buttons">
                                Pay
</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <List>
                {cart.items.map(item => <CartItem key={item.id} item={item} cart={cart} setCart={setCart} />)}
            </List >
        </>

};
