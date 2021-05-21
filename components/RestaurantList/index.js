import { useContext, useEffect } from 'react'
import { useQuery, gql } from "@apollo/client";
import { Grid } from '@material-ui/core';

import RestaurantCard from './card'
import { AppContext } from '../layout'


const QUERY = gql`{
    restaurants {
        id
        name 
        description 
        image {url} 
    }
}`;

export default function Restaurants() {
    const { query, show, setShow } = useContext(AppContext);
    const { data, loading, error } = useQuery(QUERY);

    //app root, show search bar
    useEffect(() => setShow(true), [show])


    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        console.error(error);
        return null;
    }

    //console.log('search', query)
    const restaurants = data.restaurants.filter(r => r.name.toLowerCase().includes(query));

    return (
        <Grid container spacing={3}>
            {restaurants.map(r => <RestaurantCard key={r.id} restaurant={r} />)}
        </Grid>
    );
}

