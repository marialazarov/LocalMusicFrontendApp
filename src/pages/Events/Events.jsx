// EveryEvent.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { bringAllEvents } from "../../services/apicall";
import EventCard from "../../components/EventCard/EventCard";
import './Events.css'
export const Events = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (events.length === 0) {
      bringAllEvents().then((eventsData) => {
        setEvents(eventsData); // Asumiendo que los eventos están en el formato correcto
      }).catch(error => console.error("Error al traer los eventos:", error));
    }
  }, [events]);

  const viewEventDetail = (eventId) => {
    // Implementa la navegación al detalle del evento si es necesario
  };

  return (
    <div>

        <h1 className="titulo"> TODOS LOS EVENTOS PRÓXIMOS</h1>
      <div className="events">
        {events.length > 0 ? (
          events.map((events) => (
            <div key={events.id} className="event-card" onClick={() => viewEventDetail(event.id)}>
              <EventCard
                date={events.date}
                location={events.location}
                // Agrega más propiedades del evento según sea necesario
              />
            </div>
          ))
        ) : (
          <p>No hay eventos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default Events;
