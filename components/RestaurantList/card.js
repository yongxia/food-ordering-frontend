import React from 'react';
import NextLink from 'next/link'
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

export default function RestaurantCard(props) {
    const classes = useStyles();

    const { id, name, description, image } = props.restaurant;

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
                <NextLink
                    href={`/restaurant/${id}`}
                >
                    <Link href="#">View Dish</Link>
                </NextLink>
            </CardActions>
        </Card>
    );
}
