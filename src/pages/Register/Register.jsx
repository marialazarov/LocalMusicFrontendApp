import { useState } from "react";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { createUsers } from "../../services/apicall"; // Importa la función para crear usuarios
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import './Register.css'
import "bootstrap/dist/css/bootstrap.min.css";


export const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    surname: "",
    email: "",
    password: "",
    phone: ""
  });

  const [validated, setValidated] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  // Maneja los cambios en los campos del formulario
  const inputHandler = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value
    });
  };

  // Maneja el envío del formulario para crear un nuevo usuario
// Maneja el envío del formulario para crear un nuevo usuario
const registerUserHandler = async (event) => {
  try {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario
    
    // Llama a la función para crear un usuario con los datos del estado userData
    await createUsers(userData);

    // Si el usuario se crea con éxito, puedes mostrar la ventana emergente y redirigir a otra página
    setRegistrationSuccess(true); // Establece el estado de registro exitoso en verdadero
    setTimeout(() => {
      navigate("/"); // Redirige a la página de inicio después del registro exitoso
    }, 5000); // Redirige después de 5 segundos (5000 ms)
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
  }
};


  return (
    <>
      <h1 className="tituloregistro">Registro de Usuario</h1>
      
      <div className="registro">
        {/* Ventana emergente de registro exitoso */}
        {registrationSuccess && (
          <div className="registration-success-popup">
            <p>¡Usuario registrado correctamente!</p>
          </div>
        )}
        {/* Campos del formulario */}




    <Form noValidate validated={validated} onSubmit={handleSubmit}>
    <Row className="mb-2">
      <Form.Group as={Col} md="12" controlId="validationCustom01">
        <CustomInput
          type="text"
          text = "name"
          placeholder="Nombre"
          value = {userData.name}
          handler={inputHandler}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} md="12" controlId="validationCustom02">
        <CustomInput
        
        placeholder="Apellido"
        type="text"
        name="name"
        value={userData.surname}
        handler={inputHandler}
      />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} md="12" >
         
          <CustomInput
        placeholder="Nombre de Usuario"
        type="text"
        name="username"
        value={userData.username}
        handler={inputHandler}
      />
          <Form.Control.Feedback type="invalid">
            Please choose a username.
          </Form.Control.Feedback>
      
      </Form.Group>
    </Row>
    <Row className="mb-3">
      <Form.Group as={Col} md="12" controlId="validationCustom03">
      <CustomInput
        placeholder="Correo Electrónico"
        type="email"
        name="email"
        value={userData.email}
        handler={inputHandler}
      />
   
      </Form.Group>
      <Form.Group as={Col} md="12" controlId="validationCustom04">
        <CustomInput
        placeholder="Contraseña"
        type="password"
        name="password"
        value={userData.password}
        handler={inputHandler}
      />
        <Form.Control.Feedback type="invalid">
          Please provide a valid password.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} md="12" controlId="validationCustom05">
        <CustomInput

        placeholder="Teléfono"
        type="text"
        name="phone"
        value={userData.phone}
        handler={inputHandler}
      />
        <Form.Control.Feedback type="invalid">
          Please provide a valid phone
        </Form.Control.Feedback>
      </Form.Group>
    </Row>
    <Form.Group className="mb-3">
    </Form.Group>
    <Button type="submit" onClick={registerUserHandler}>Register</Button>
  </Form>
  </div>
  </>
);
}

export default Register;