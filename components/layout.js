import { useState, createContext } from 'react'

import Head from './header'
import Footer from './footer'
import Meta from './meta'
import { Container } from '@material-ui/core';

export const AppContext = createContext({
    query: "",
    show: true,
    user: null,
    cart: { items: [], total: 0, amount: .0 },
    setQuery: () => { },
    setShow: () => { },
    setUser: () => { },
    setCart: () => { },
});

const Layout = ({ children }) => {

    const [query, setQuery] = useState("");
    const [show, setShow] = useState(true);
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState({ items: [], total: 0, amount: .0 });


    return (
        <AppContext.Provider value={{ query, setQuery, show, setShow, user, setUser, cart, setCart }}>
            <Container>
                <Meta />
                <Head total={cart.total} />
                <br />
                <main >{children}</main>
                <br />
                <Footer />
            </Container>
        </AppContext.Provider>
    )
};

export default Layout;