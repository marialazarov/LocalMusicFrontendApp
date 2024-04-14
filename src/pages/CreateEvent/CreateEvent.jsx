import React, { useEffect, useState } from "react";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { createEvent } from "../../services/apicall";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "bootstrap/dist/css/bootstrap.min.css";
import { Icon } from "@iconify/react";
import "./CreateEvent.css"; // Añadir archivo de estilos

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
            }, 3000);
        } catch (error) {
            console.error("Error al registrar el evento:", error);
        }
    };

    const inputHandler = (event) => {
        setArtistId(event.target.value);
    };

    return (
        <div className="create-event-container">
            <h1 className="tituloevento">¿Quieres asistir a este Evento?</h1>
            <div className="registro-evento">
                {registrationSuccess && (
                    <div className="registration-success-popup">
                        <p>¡Evento registrado correctamente!</p>
                    </div>
                )}

                <Form onSubmit={handleSubmit}>
                    <Row className="mb-2">
                        <Col md="12">
                            <h1 className="location">{dataevent.state.location}</h1>
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md="12">
                            <h2 className="date">{dataevent.state.date}</h2>
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md="12">
                            <h3 className="input-label">Ingresa el número de ID del artista del evento al que quieres asistir:</h3>
                            <CustomInput
                                placeholder="ID del Artista"
                                type="number"
                                value={artist_id}
                                handler={inputHandler}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md="12">
                            <Button variant="light" type="submit" className="submit-button">
                                <Icon icon="gravity-ui:hand-ok" />
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
};

export default CreateEvent;
