import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Link
} from '@material-ui/core';

import { AppContext } from '../layout'

const useStyles = makeStyles((theme) => ({
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    card: {
        margin: 8,
        width: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    grow: {
        flexGrow: 1
    }
}));

export default function DishCard(props) {
    const classes = useStyles();

    const { cart, setCart } = useContext(AppContext);
    const addToCart = () => {
        let item = cart.items.find(item => item.id == props.dish.id);
        if (item === undefined) {
            cart.items.push({ ...props.dish, quitality: 1 });
        } else {
            item.quitality++;
        }
        cart.total++;
        setCart({ ...cart });
    };
    const { id, name, description, image, price } = props.dish;

    return (
        <Card component={Card} className={classes.card}>
            <CardHeader title={name} />
            <CardMedia
                className={classes.media}
                image={image ? `${process.env.NEXT_PUBLIC_API_URL}${image.url}` : '/default.png'}
                title={`dish ${name}`}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing display="flex">
                <Typography className={classes.grow} component="p">
                    ${price}
                </Typography>
                <Link href="#" onClick={addToCart}>Add to Cart</Link>
            </CardActions>
        </Card>
    );
}
