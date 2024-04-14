import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userData1 } from "../userSlice";
import { bringEventById } from "../../services/apicall";
import './MyEvents.css'
import Card from 'react-bootstrap/Card';
import { Row, Col } from "react-bootstrap"; // Importa Row y Col de react-bootstrap

export const MyEvents = () => {
    const [userEvents, setUserEvents] = useState([]);
    const userRdxData = useSelector(userData1);
    const decoded = userRdxData.userData;

    useEffect(() => {
        const fetchUserEvents = async () => {
            try {
                const token = userRdxData.token;
                const userId = decoded.userId;
                if (!userId) {
                    console.error("No se encontró el ID del usuario");
                    return;
                }
                const events = await bringEventById(token, userId);
                setUserEvents(events);
            } catch (error) {
                console.error("Error al obtener los eventos del usuario:", error);
            }
        };

        fetchUserEvents();
    }, [userRdxData, decoded]);

    // Función para formatear la fecha en un formato legible
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    return (
        <>
            <div className="eventos">
                {userEvents.length > 0 ? (
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {userEvents.map(event => (
                            <Col key={event.id}>
                                <Card className="event-card">
                                    <Card.Body>
                                        <Card.Title> <h2 className="h2">Tus Eventos</h2></Card.Title>
                                        <Card.Text>
                                            <p className="p1">Fecha: {formatDate(event.date)}</p>
                                            <p className="p1">Hora: {event.location}</p>
                                            <p className="p2"> No olvides tu número de ID <br/>¡Pásalo bien! </p>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <p className="p">No hay eventos disponibles para este usuario.</p>
                )}
            </div>
        </>
    );
};
