import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { bringAllEvents } from "../../services/apicall";
import EventCard from "../../components/EventCard/EventCard";
import './Events.css'
import Alert from 'react-bootstrap/Alert';
export const Events = () => {
  const [events, setEvents] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (events.length === 0) {
      bringAllEvents()
        .then((eventsData) => {
          const uniqueEvents = filterUniqueEvents(eventsData);
          setEvents(uniqueEvents);
        })
        .catch((error) =>
          console.error("Error al traer los eventos:", error)
        );
    }
  }, [events]);


  const showAlertAndRedirect = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      navigate('/createEvent');
    }, 6000);
  };

  const filterUniqueEvents = (eventsData) => {
    const uniqueEvents = [];
    const seenArtistIds = new Set();
    eventsData.forEach((event) => {
      if (!seenArtistIds.has(event.artist_id)) {
        uniqueEvents.push(event);
        seenArtistIds.add(event.artist_id);
      }
    });
    return uniqueEvents;
  };

  return (
    <div>
      <h1 className="titulo"> TODOS LOS EVENTOS PRÓXIMOS</h1>
      <div className="events">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="event-card">
              <EventCard
                date={event.date}
                location={event.location}
                artist_id={event.artist_id}
                handler={showAlertAndRedirect}
              />
            </div>
          ))
        ) : (
          <p>No hay eventos disponibles.</p>
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
      <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDYwZm14MHlneHNodzVqMDN3dzYzazJvMTZyeGRxZmNzOTFydDY0aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sSgvbe1m3n93G/giphy.gif"></img>
      </Alert>
       
      )}
    </div>
  );
};
