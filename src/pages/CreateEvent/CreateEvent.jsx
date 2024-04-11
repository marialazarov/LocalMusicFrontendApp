import React, { useEffect, useState } from "react";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { createEvent } from "../../services/apicall"; 
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "bootstrap/dist/css/bootstrap.min.css";

export const CreateEvent = () => {
    const dataevent = useLocation(); // Obtiene la ubicación actual
    const navigate = useNavigate();
    const [artist_id, setArtistId] = useState("");
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createEvent({
                user_id: dataevent.state.eventData.user_id,
                artist_id: artist_id,
                date: dataevent.state.eventData.date,
                location: dataevent.state.eventData.location
            });
            setRegistrationSuccess(true);
            setTimeout(() => {
                navigate("/");
            }, 5000);
        } catch (error) {
            console.error("Error al registrar el evento:", error);
        }
    };

    const inputHandler = (event) => {
        setArtistId(event.target.value);
    };

    return (
        <>
            <h1 className="tituloevento">¿Quieres asistir este Evento?</h1>
            <div className="registro-evento">
                {registrationSuccess && (
                    <div className="registration-success-popup">
                        <p>¡Evento registrado correctamente!</p>
                    </div>
                )}

                <Form onSubmit={handleSubmit}>
                    <Row className="mb-2">
                  <h1> {dataevent.state.location} </h1>
                    </Row>
                    <Row className="mb-2">
                        <Col md="12">
                   <h2> {dataevent.state.date}</h2>
                        </Col>
                    </Row>
                    <Row className="mb-2">
               
                    </Row>
                    <Row className="mb-2">
               <h3> Tu ID de Usuario es {dataevent.state.user_id}</h3>
                    </Row>
                    <CustomInput
                                placeholder="ID del Artista"
                                type="number"
                                value={artist_id}
                                handler={inputHandler}
                            />

                    <Button type="submit">CONFIRMAR ASISTENCIA</Button>
                </Form>
            </div>
        </>
    );
};

export default CreateEvent;
