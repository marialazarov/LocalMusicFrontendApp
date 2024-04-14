
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
    <Navbar collapseOnSelect expand="lg"  className="bg-body-tertiary" style={{ width: "100%" }}>
      
        <Navbar.Brand href=""></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="home"><h4>Home</h4></Nav.Link>
            <Nav.Link href="artist"><h4>Artistas</h4></Nav.Link>
            <NavDropdown title="Mi cuenta" id="collapsible-nav-dropdown">
              {!userRdxData.token ? (
                <>
                  <NavDropdown.Item className="navdrop" href="home"><h4>Entrar</h4></NavDropdown.Item>
                  <NavDropdown.Item className="navdrop" href="register"><h4>Registrarse</h4></NavDropdown.Item>
                </>
              ) : decoded.userRoles =='admin' ? (
                <>
                <NavDropdown.Item  className="navdrop" href="profile"><h4>Perfil</h4></NavDropdown.Item>
                <NavDropdown.Item  className="navdrop" href="admin"><h4>Lista de usuarios</h4></NavDropdown.Item>
                <NavDropdown.Item className="navdrop" href="everyevent"><h4>¿Qué eventos hay en la ciudad?</h4></NavDropdown.Item>
                 <NavDropdown.Item className="navdrop" href="myEvents"><h4>Mis eventos</h4></NavDropdown.Item>
                 <NavDropdown.Item className="navdrop" href="home" onClick={() => logMeOut()}>Log Out</NavDropdown.Item>
                
                </>
              ): (
                <>

                <NavDropdown.Item href="profile"><h3>Perfil</h3></NavDropdown.Item>
                <NavDropdown.Item href="myEvents"><h3>Mis Eventos</h3></NavDropdown.Item>
                <NavDropdown.Item href="everyevent"><h3>¿Qué eventos hay en la ciudad?</h3></NavDropdown.Item>
                <NavDropdown.Item href="home" onClick={() => logMeOut()}>Log Out</NavDropdown.Item>
                
                
                </>
              )}

              
            </NavDropdown>
           
          </Nav>
        </Navbar.Collapse>
      
    </Navbar>
  );
};

export default Header;
