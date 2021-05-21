import { useRouter } from 'next/router'
import { useQuery, gql } from "@apollo/client";
import { Grid } from '@material-ui/core';

import DishCard from '../components/DishList/card'

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
const restuarant = () => {
    const router = useRouter();
    const { id } = router.query;
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
                shopping cart
            </Grid>
            <Grid container spacing={3}>
                {dishes.map(d => <DishCard key={d.id} dish={d} />)}
            </Grid>
        </>
    );

}

export default restuarant;