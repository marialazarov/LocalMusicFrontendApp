import React, { useState } from "react";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { createEvent } from "../../services/apicall"; 
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { userData1 } from "../userSlice";

export const CreateEvent = () => {
    const userRdxData = useSelector(userData1);
    const token = userRdxData.token;
    const decoded = userRdxData.userData;
    const myid = userRdxData.userData.userId;
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    user_id: myid,
    artist_id: "",
    date: "",
    location: ""
  });
  console.log(myid)

  const [validated, setValidated] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        await createEvent(eventData);
        setRegistrationSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 5000);
      } catch (error) {
        console.error("Error al registrar el evento:", error);
      }
    }
    setValidated(true);
  };

  const inputHandler = (event) => {
    setEventData({
      ...eventData,
      [event.target.name]: event.target.value
    });
  };

  return (
    <>
      <h1 className="tituloevento">Registro de Evento</h1>
      <div className="registro-evento">
        {registrationSuccess && (
          <div className="registration-success-popup">
            <p>¡Evento registrado correctamente!</p>
          </div>
        )}

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-2">
            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <CustomInput
                type="datetime-local"
                text="Fecha y Hora"
                name="date"
                value={eventData.date}
                handler={inputHandler}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationCustom02">
              <CustomInput
                placeholder="Ubicación"
                type="text"
                name="location"
                value={eventData.location}
                handler={inputHandler}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationCustom02">
              <CustomInput
                placeholder=" Atist Id"
                type="number"
                name="artist_id"
                value={eventData.artist_id}
                handler={inputHandler}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button type="submit">Register Event</Button>
        </Form>
      </div>
    </>
  );
};

export default CreateEvent;
