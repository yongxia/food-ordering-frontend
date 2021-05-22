import { useState, createContext } from 'react'

import Head from './header'
import Footer from './footer'
import Meta from './meta'
import { Container } from '@material-ui/core';

export const AppContext = createContext({
    query: "",
    show: true,
    user: null,
    setQuery: () => { },
    setShow: () => { },
    setUser: () => { }
});

const Layout = ({ children }) => {

    const [query, setQuery] = useState("");
    const [show, setShow] = useState(true);
    const [user, setUser] = useState(null);

    return (
        <AppContext.Provider value={{ query, setQuery, show, setShow, user, setUser }}>
            <Container maxWidth="lg">
                <Meta />
                <Head />
                <br />
                <main >{children}</main>
                <br />
                <Footer />
            </Container>
        </AppContext.Provider>
    )
};

export default Layout;