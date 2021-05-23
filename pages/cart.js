import { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Avatar,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    IconButton
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';

import { AppContext } from '../components/layout';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

const CartItem = ({ item, cart, setCart }) => {

    const { id, image, name, price, quitality } = item;

    const increase = () => {
        setCart(() => {
            item.quitality++;
            cart.total++;
            return { ...cart }
        });
    }

    const decrease = () => {
        setCart(() => {
            if (item.quitality == 1) {
                //cart size might change when click decreas, use findIndex
                let index = cart.items.findIndex(i => i.id == id);
                cart.items = cart.items.splice(index);
            } else {
                item.quitality--;
            }
            cart.total--;
            return { ...cart }
        });
    }


    return (
        <List >
            <ListItem>
                <ListItemAvatar>
                    <Avatar variant="square" alt={name} src={image ? `${process.env.NEXT_PUBLIC_API_URL}${image.url}` : '/default.png'} />
                </ListItemAvatar>
                <ListItemText
                    primary={name}
                    secondary={<><p>{`Price: ${price}`}</p><p>{`Qty: ${quitality}`}</p></>}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="increase">
                        <AddIcon color="primary" onClick={increase} />
                    </IconButton>

                    <IconButton edge="end" aria-label="decrease">
                        <RemoveIcon style={{ color: "red" }} onClick={decrease} />
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
        <>
            <h2>CART</h2>
            <Typography variant="body2" color="textSecondary" component="p">
                Your cart is empty
                </Typography>
        </> :
        <>
            < ListItem key="total">
                <ListItemText><h3>CART Orders - Total items: {cart.total}, Total price: $0</h3></ListItemText>
            </ListItem>

            <List>
                {cart.items.map(item => <CartItem key={item.id} item={item} cart={cart} setCart={setCart} />)}
            </List >
        </>


};
