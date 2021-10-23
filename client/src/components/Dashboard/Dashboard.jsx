import { useEffect } from 'react';
import Navigation from '../Navigation/Navigation';
import Container from "react-bootstrap/Container";
import Footer from "../Footer/Footer";

function Dashboard() {
    return(
            <Container>
                <Navigation/>
                <Footer />
            </Container>
    );
}


export default Dashboard;