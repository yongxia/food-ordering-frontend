import { useContext, useEffect } from 'react'
import NextLink from 'next/link'

import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Grid,
    Typography,
    Link
} from '@material-ui/core';

import { AppContext } from '../components/layout'


const useStyles = makeStyles((theme) => ({
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    card: {
        margin: 16,
        width: 345,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    }
}));

function RestaurantCard({ restaurant }) {
    const classes = useStyles();

    const { id, name, description, image } = restaurant;

    return (
        <Card component={Card} className={classes.card}>
            <CardHeader title={name} />
            <CardMedia
                className={classes.media}
                image={image.length > 0 ? `${process.env.NEXT_PUBLIC_API_URL}${image[0].url}` : '/default.png'}
                title={`restuarant ${name}`}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <NextLink href={`/restaurant/${id}`}>
                    <Link href="#">View Dish</Link>
                </NextLink>
            </CardActions>
        </Card>
    );
}

export default function Restaurants({ restaurants }) {
    const { query, show, setShow } = useContext(AppContext);

    //app root, show search bar
    useEffect(() => setShow(true), [show])

    restaurants = restaurants.filter(r => r.name.toLowerCase().includes(query));

    return (
        <Grid container spacing={3}>
            {restaurants.map(r => <RestaurantCard key={r.id} restaurant={r} />)}
        </Grid>
    );
}