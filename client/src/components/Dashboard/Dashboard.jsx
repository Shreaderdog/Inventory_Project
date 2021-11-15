// Dashboard.jsx
import Navigation from '../Navigation/Navigation';
import Container from "react-bootstrap/Container";
import Footer from "../Footer/Footer";

function Dashboard() {
    return(
            <>
                <Navigation />
                <Container fluid className="h-100 w-100">
                    <div className="row align-items-center">
                        <div className = "col align-self-center">
                            <h1 style={{textAlign: "center"}}> Select a tab above to get started</h1>
                        </div>
                    </div>
                </Container>
                <Footer />
            </>
    );
}


export default Dashboard;