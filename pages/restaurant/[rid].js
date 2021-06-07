//import { useRouter } from 'next/router';
//import { useQuery, gql } from "@apollo/client";
import { gql } from "@apollo/client";
import { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Grid,
    Typography,
    Link
} from '@material-ui/core';

import { AppContext } from '../../components/layout';
import client from "../../lib/apollo-client";

/*
query($id:  ID!){
                restaurant (id: $id)
                {
                    id
                    name
                    dishes
                    {
                        id
                        name
                        description
                        price
                        image
                        {
                            url
                        }
                    }
                }
            }
*/

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridGap: theme.spacing(3),
    },
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

function DishCard(props) {
    const classes = useStyles();

    const { cart, setCart } = useContext(AppContext);
    const addToCart = () => {
        let item = cart.items.find(item => item.id == props.dish.id);
        if (item === undefined) {
            cart.items.push({ ...props.dish, quantity: 1 });
        } else {
            item.quantity++;
        }
        cart.total++;
        cart.amount += props.dish.price;
        setCart({ ...cart, });
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

function restaurant({ restaurant }) {
    const classes = useStyles();

    const { show, setShow } = useContext(AppContext);
    //hide search bar for restuarant when display dishes
    useEffect(() => setShow(false), [show]);

    /*
    const router = useRouter();

    if (loading) return <h2>loading...</h2>;

    if (error) {
        return `Error! ${error}`;
    }
    */

    const { name, dishes } = restaurant;

    return (
        <>
            <Link href='/'>
                <Button variant="outlined">Back</Button>
            </Link>
            <Typography variant="h3" gutterBottom>{name}</Typography>
            <Grid container>
                {dishes.map(d => <DishCard key={d.id} dish={d} />)}
            </Grid>
        </>
    );

}

export async function getStaticPaths() {

    const { data } = await client.query({
        query: gql`{ restaurants { id } }`
    });
    //console.log('ids', data);

    const paths = data.restaurants.map(r => ({
        params: { rid: r.id },
    }))

    return { paths, fallback: false }
}


export async function getStaticProps({ params }) {
    const { data } = await client.query({
        query: gql`
                query($id:  ID!){
                    restaurant (id: $id)
                    {
                        name
                        dishes
                        {
                            id
                            name
                            description
                            price
                            image
                            {
                                url
                            }
                        }
                    }
                }
                `,
        variables: { id: params.rid },
    });

    //console.log('[rid].js', params.rid, data);

    return {
        props: {
            restaurant: data.restaurant,
        },
    };
}


export default restaurant;

