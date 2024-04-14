import React, { useState } from "react";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { createUsers } from "../../services/apicall";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './Register.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Icon } from "@iconify/react";

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

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }

        try {
            await createUsers(userData);
            setRegistrationSuccess(true);
            setTimeout(() => {
                navigate("/");
            }, 5000);
        } catch (error) {
            console.error("Error al registrar el usuario:", error);
        }
    };

    const inputHandler = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        });
    };

    return (
        <>
            <h1 className="welcome">Registro de Usuario</h1>

            <div className="midiv">
                {registrationSuccess && (
                    <div className="registration-success-popup">
                        <p>¡Usuario registrado correctamente!</p>
                    </div>
                )}
  
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-2">
                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                            <Form.Control
                                type="text"
                                placeholder="Nombre"
                                value={userData.name}
                                onChange={inputHandler}
                                required
                            />
                            <Form.Control.Feedback type="invalid">Please choose a name.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="12" controlId="validationCustom02">
                            <Form.Control
                                placeholder="Apellido"
                                type="text"
                                name="surname"
                                value={userData.surname}
                                onChange={inputHandler}
                                required
                            />
                            <Form.Control.Feedback type="invalid">Please provide a surname.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="12">
                            <Form.Control
                                placeholder="Nombre de Usuario"
                                type="text"
                                name="username"
                                value={userData.username}
                                onChange={inputHandler}
                                required
                            />
                            <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="validationCustom03">
                            <Form.Control
                                placeholder="Correo Electrónico"
                                type="email"
                                name="email"
                                value={userData.email}
                                onChange={inputHandler}
                                required
                            />
                            <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="12" controlId="validationCustom04">
                            <Form.Control
                                placeholder="Contraseña"
                                type="password"
                                name="password"
                                value={userData.password}
                                onChange={inputHandler}
                                required
                            />
                            <Form.Control.Feedback type="invalid">Please provide a valid password.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="12" controlId="validationCustom05">
                            <Form.Control
                                placeholder="Teléfono"
                                type="text"
                                name="phone"
                                value={userData.phone}
                                onChange={inputHandler}
                                required
                            />
                            <Form.Control.Feedback type="invalid">Please provide a valid phone</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <div className="centrar">
                        <Button variant="light" type="submit" className="botonmicro"><Icon icon="fluent-mdl2:subscribe" /></Button>
                    </div>
                </Form>
                
            </div>
        </>
    );
};

export default Register;
