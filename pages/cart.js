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

import Router from 'next/router'
import Cookies from 'js-cookie';

import { AppContext } from '../components/layout';
import { loadStripe } from '@stripe/stripe-js'


const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PK || 'pk_test_51IuNBpHadV40hZ9ubGzOIlVSUdPRvaE65OQDwyZ9Edu4hKUomaGnEbciYiJqf3W7ky0lqkxQlAuOW7YNhgHDytQe00n0TB6aqO'

const stripPromise = loadStripe(STRIPE_PK);
console.log('pk', STRIPE_PK)

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1
    },
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
    const { id, image, name, price, quantity } = item;

    const increase = () => {
        setCart(() => {
            item.quantity++;
            cart.total++;
            cart.amount += price;
            return { ...cart }
        });
    }

    const decrease = () => {
        setCart(() => {
            if (item.quantity == 1) {
                //cart size might change when click decreas, use findIndex
                let index = cart.items.findIndex(i => i.id == id);
                cart.items.splice(index, 1);
            } else {
                item.quantity--;
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
                    secondary={
                        <>
                            Price: ${price}
                            <br />
                            Qty: {quantity}
                        </>
                    }
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

export const OderSummary = ({ total, amount }) => {

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell align="right">Total Items</TableCell>
                    <TableCell align="right">Total Amount</TableCell>

                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow key={1}>
                    <TableCell align="right">{total}</TableCell>
                    <TableCell align="right">${Math.round(amount * 100) / 100}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
};

export default function Cart() {
    const classes = useStyles();
    const { user, cart, setCart } = useContext(AppContext);

    const handlePay = async () => {
        const token = Cookies.get('token');
        const stripe = await stripPromise;

        if (user === null || token === undefined) {
            Router.push('/login');
        } else {

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
                method: "POST",
                headers: token && { Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    amount: Number(Math.round(cart.total + "e2") + "e-2"),
                    dishes: cart.items,
                    //address: data.address,
                    // city: data.city,
                    // state: data.state,
                    user: user.id,
                }),
            });
            console.log('order res', response);
            if (!response.ok) {
                setError(response.statusText);
            }

            const session = await response.json();

            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });
        }
    }

    return cart.total === 0 ?
        <div style={{ textAlign: "center" }}>
            <Typography variant="h4">Cart</Typography>
            <Typography variant="body1" color="textSecondary" >
                Your cart is empty
                </Typography>
        </div>
        :
        <>
            <OderSummary total={cart.total} amount={cart.amount} />
            <Button variant="outlined"
                edge="end"
                color="primary"
                href="#outlined-buttons"
                onClick={handlePay}>
                Pay
                    </Button>
            <List>
                {cart.items.map(item => <CartItem key={item.id} item={item} cart={cart} setCart={setCart} />)}
            </List >
        </>

};
