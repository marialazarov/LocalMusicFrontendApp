import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, userData1 } from "../../pages/userSlice";
import './Header.css'


export const Header = () => {
  
  const navigate = useNavigate()


  const dispatch = useDispatch();
  const userRdxData = useSelector(userData1)
  const token = userRdxData.token
  const decoded = userRdxData.userData

  const logMeOut = () =>{
    dispatch(logout())
    setTimeout(()=>{
        navigate('/home')
    },1000)
  } // para borrar los tokens y los datos del usuario una vez hace click en logout

  return (
    <Navbar collapseOnSelect expand="lg"  className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href=""><h4>WELCOME</h4></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="home">Home</Nav.Link>
            <Nav.Link href="artist">Artists</Nav.Link>
            <NavDropdown title="My Account" id="collapsible-nav-dropdown">
              {!userRdxData.token ? (
                <>
                  <NavDropdown.Item href="home">Login</NavDropdown.Item>
                  <NavDropdown.Item href="register">Register</NavDropdown.Item>
                </>
              ) : decoded.userRoles =='admin' ? (
                <>
                <NavDropdown.Item href="profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="admin">Users</NavDropdown.Item>
                <NavDropdown.Item href="everyevent">All the Events Around You</NavDropdown.Item>
                 <NavDropdown.Item href="myEvents">My Events</NavDropdown.Item>
                 <NavDropdown.Item href="home" onClick={() => logMeOut()}>Log Out</NavDropdown.Item>
                
                </>
              ): (
                <>

                <NavDropdown.Item href="profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="createEvents">New Event</NavDropdown.Item>
                <NavDropdown.Item href="myEvents">My Events</NavDropdown.Item>

                <NavDropdown.Item href="everyevent">All the Events Around You</NavDropdown.Item>
                <NavDropdown.Item href="home" onClick={() => logMeOut()}>Log Out</NavDropdown.Item>
                
                
                </>
              )}

              
            </NavDropdown>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
