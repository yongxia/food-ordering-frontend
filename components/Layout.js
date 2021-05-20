import { useState, createContext } from 'react'

import Head from './header'
import Footer from './footer'
import Meta from './meta'
import { Container } from '@material-ui/core';

export const QueryContext = createContext({
    query: "",
    setQuery: () => { }
});


const Layout = ({ children }) => {

    const [query, setQuery] = useState("");
    const value = { query, setQuery };

    return (
        <QueryContext.Provider value={value}>
            <Container maxWidth="lg">
                <Meta />
                <Head query={query} updateQuery={setQuery} />
                <br />
                <main >{children}</main>
                <br />
                <Footer />
            </Container>
        </QueryContext.Provider>
    )
};

export default Layout;