import { useRouter } from 'next/router';
import { useQuery, gql } from "@apollo/client";
import { Grid } from '@material-ui/core';
import { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { AppContext } from '../../components/layout';
import DishCard from '../../components/DishList/card';
import Cart from '../cart'

const QUERY = gql`
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
`

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridGap: theme.spacing(3),
    }
}));

const restuarant = () => {
    const classes = useStyles();

    const { show, setShow } = useContext(AppContext);
    //hide search bar for restuarant when display dishes
    useEffect(() => setShow(false), [show]);

    const router = useRouter();
    const id = router.query.rid;
    const { loading, error, data } = useQuery(QUERY, {
        variables: { id },
    });

    if (loading) return <h2>loading...</h2>;

    if (error) {
        return `Error! ${error}`;
    }

    const { name, dishes } = data.restaurant;

    return (
        <>
            <h2>{name}</h2>
            <Grid container>
                {dishes.map(d => <DishCard key={d.id} dish={d} />)}
            </Grid>
        </>
    );

}

export default restuarant;