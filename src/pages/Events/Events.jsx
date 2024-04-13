import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { bringAllEvents } from "../../services/apicall";
import EventCard from "../../components/EventCard/EventCard";
import './Events.css';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

export const Events = () => {
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(5); // Define el número de eventos por página
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (events.length === 0) {
            bringAllEvents().then((eventsData) => {
                setEvents(eventsData); // Asumiendo que los eventos están en un array directamente
            }).catch(error => console.error("Error al traer los eventos:", error));
        }
    }, [events]);

    const showAlertAndRedirect = (eventId, eventData) => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
            navigate(`/createEvent/${eventId}`, { state: { eventData } }); // Pasa el ID del evento y los datos del evento en la ubicación
        }, 6000);
    };

    // Calcula el índice del último evento en la página actual
    const indexOfLastEvent = currentPage * eventsPerPage;
    // Calcula el índice del primer evento en la página actual
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    // Obtiene los eventos de la página actual
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    // Cambia la página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <h1 className="titulo"> TODOS LOS EVENTOS PRÓXIMOS</h1>
            <div className="events">
                {currentEvents.length > 0 ? (
                    currentEvents.map((event) => (
                        <div key={event.id} className="event-card">
                            <EventCard
                                date={event.date}
                                location={event.location}
                                artist_id={event.artist_id}
                                handler={() => showAlertAndRedirect(event.id, event)}
                            />
                        </div>
                    ))
                ) : (
                    <p>No hay eventos disponibles.</p>
                )}
            </div>
            <div className="pagination">
                {events.length > 0 && (
                    <div className="buttonContainer">
                        {Array.from({ length: Math.ceil(events.length / eventsPerPage) }, (_, i) => (
                            <Button key={i + 1} variant="light" className="pagination-button" onClick={() => paginate(i + 1)}>{i + 1}</Button>
                        ))}
                    </div>
                )}
            </div>
            {showAlert && (
                <Alert variant="success">
                    <Alert.Heading>GRACIAS POR APOYAR EL TALENTO LOCAL</Alert.Heading>
                    <p>
                        Te redigiremos a un formulario para que puedas rellenar y confirmar tu asistencia al evento
                    </p>
                    <hr />
                    <p className="mb-0">
                        Tu número de ID es muy importante en este proceso, es tu identificación en el evento!
                    </p>
                    <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDYwZm14MHlneHNodzVqMDN3dzYzazJvMTZyeGRxZmNzOTFydDY0aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sSgvbe1m3n93G/giphy.gif" alt="Gracias" />
                </Alert>
            )}
        </div>
    );
};
