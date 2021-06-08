import Head from 'next/head'
import { Typography } from '@material-ui/core';

export default function Home() {
    return (
        <div>
            <Head>
                <title>Thanks for your order!</title>
            </Head>

            <section>
                <Typography variant="h6">We appreciate your business!</Typography>
            </section>
        </div>
    )
}
