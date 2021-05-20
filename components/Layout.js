import Head from './header'
import Footer from './footer'
import Meta from './meta'
import { Container } from '@material-ui/core';

const Layout = ({ children }) => {

    return (
        <Container maxWidth="lg">
            <Meta />
            <Head />
            <br />
            <main>{children}</main>
            <br />
            <Footer />
        </Container>
    )
};

export default Layout;