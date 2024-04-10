import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { bringAllEvents } from "../../services/apicall";
import EventCard from "../../components/EventCard/EventCard";
import './Events.css';

export const Events = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (events.length === 0) {
      bringAllEvents().then((eventsData) => {
        console.log("Datos recibidos de bringAllEvents:", eventsData);
        const uniqueEvents = filterUniqueEvents(eventsData);
        setEvents(uniqueEvents);
      }).catch(error => console.error("Error al traer los eventos:", error));
    }
  }, [events]);

  const viewEventDetail = (eventId) => {
    navigate('/createnewevent');
  };

  const filterUniqueEvents = (eventsData) => {
    const uniqueEvents = [];
    const seenArtistIds = new Set();
    eventsData.forEach(event => {
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
            <div key={event.id} className="event-card" onClick={() => viewEventDetail(event.id)}>
              <EventCard
                date={event.date}
                location={event.location}
                artist_id={event.artist_id}
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
