import { useQuery, gql } from "@apollo/client";
import Grid from '@material-ui/core/Grid';

import RestaurantCard from './card'

const QUERY = gql`{
    restaurants {
        name 
        description 
        image {url} 
    }
}`;

export default function Restaurants() {
    const { data, loading, error } = useQuery(QUERY);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        console.error(error);
        return null;
    }

    const restaurants = data.restaurants;

    return (
        <Grid item xs={12}>
            <Grid container justify="center" spacing={10}>
                {restaurants.map(r => <Grid key={r.name} item> <RestaurantCard restaurant={r} /></Grid>)}
            </Grid>
        </Grid>
    );
}

