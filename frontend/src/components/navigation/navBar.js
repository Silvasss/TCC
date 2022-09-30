import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';


function NavBar() {
  return (
    <Navbar expand="sm" bg="light" variant="light" style={{ marginTop: '2rem', marginLeft: "6%", marginRight: "6%"}}>
        <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>

            <Nav className="me-auto">
            <Nav.Link href="">Home</Nav.Link>
            <Nav.Link href="">Features</Nav.Link>
            <Nav.Link href="">Pricing</Nav.Link>
            </Nav>
        </Container>
    </Navbar>  
  );
}

export default NavBar;