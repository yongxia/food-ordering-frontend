import React from 'react';
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
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    }
}));

export default function RestaurantCard(props) {
    const classes = useStyles();

    const handleClick = () => {

    };
    const { name, description, image } = props.restaurant;

    return (
        <Card className={classes.root}>
            <CardHeader title={name} />
            <CardMedia
                className={classes.media}
                image={image.length > 0 ? `${process.env.NEXT_PUBLIC_API_URL}${image[0].url}` : '/default.png'}
                title="restuarant iamge"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Link href="#" >View Dish</Link>
            </CardActions>
        </Card>
    );
}
