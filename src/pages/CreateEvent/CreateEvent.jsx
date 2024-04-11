import React, { useEffect, useState } from "react";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { createEvent } from "../../services/apicall"; 
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { userData1 } from "../userSlice";

export const CreateEvent = () => {
    const dataevent = useLocation(); // Obtiene la ubicación actual
    const { eventId } = useParams(); // Obtiene el ID del evento de la URL
    const navigate = useNavigate();
    const [eventData, setEventData] = useState({
      user_id: "",
      artist_id: "",
      date: "",
      location: ""
    });
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
console.log(dataevent.state.eventData
    )
    useEffect(() => {
      if (dataevent.state && dataevent.state.eventData) {
        const { date, location, user_id } = dataevent.state.eventData;
        setEventData({
          ...eventData,
          user_id,
          date,
          location
        });
      }
    }, [location.state]);

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        await createEvent(eventData);
        setRegistrationSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 5000);
      } catch (error) {
        console.error("Error al registrar el evento:", error);
      }
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

          <Form onSubmit={handleSubmit}>
            <Row className="mb-2">
           
              <Form.Group as={Col} md="12" controlId="validationCustom02">
                <CustomInput
                  type="datetime-local"
                  text="Fecha y Hora"
                  name="date"
                  value={dataevent.state.eventData.date}
                  readOnly
                />
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="validationCustom03">
                <CustomInput
                  placeholder="Ubicación"
                  type="text"
                  name="location"
                  value={eventData.location}
                  readOnly
                />
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="validationCustom04">
                <CustomInput
                  placeholder="ID del Artista"
                  type="number"
                  name="artist_id"
                  value={eventData.artist_id}
                  onChange={inputHandler}
                />
              </Form.Group>
            </Row>
            <Button type="submit">Registrar Evento</Button>
          </Form>
        </div>
      </>
    );
};

export default CreateEvent;
