import { useContext } from 'react'
import { useQuery, gql } from "@apollo/client";
import { Grid, Card } from '@material-ui/core';

import RestaurantCard from './card'
import { QueryContext } from '../layout'


const QUERY = gql`{
    restaurants {
        name 
        description 
        image {url} 
    }
}`;

export default function Restaurants() {
    const { data, loading, error } = useQuery(QUERY);
    const { query: search } = useContext(QueryContext);
    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        console.error(error);
        return null;
    }

    console.log('search', search)
    const restaurants = data.restaurants.filter(r => r.name.toLowerCase().includes(search));

    return (
        <Grid container spacing={3}>
            {restaurants.map(r => <RestaurantCard restaurant={r} />)}
        </Grid>
    );
}

