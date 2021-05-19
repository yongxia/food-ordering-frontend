import AppHearder from './Header'
import AppFooter from './Footer'

import Container from '@material-ui/core/Container';


const Layout = ({ children }) => (
    <Container maxWidth="lg">
        <AppHearder></AppHearder>
        <main>{children}</main>
        <AppFooter></AppFooter>
    </Container>
);

export default Layout;