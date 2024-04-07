import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userData1 } from "../userSlice";
import { bringEventById, updateEvent } from "../../services/apicall";
import Events from "../Events/Events";

 
export const MyEvents = () => {
    const [userEvents, setUserEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [newDate, setNewDate] = useState('');
    const [newHour, setNewLocation] = useState('');
    const dispatch = useDispatch();
    const userRdxData = useSelector(userData1)
    const token = userRdxData.token
    const decoded = userRdxData.userData

    useEffect(() => {
        const fetchUserEvents = async () => {
            try {
                const userId = decoded.userId
                if (!userId) {
                    console.error("No se encontró el ID del usuario en el localStorage");
                    return;
                }
                const events = await bringEventById(userId);
                setUserEvents(events);
            } catch (error) {
                console.error("Error al obtener los appointments del usuario:", error);
            }
        };

        fetchUserEvents();
    }, []);

    const modifyEventHandler = (event) => {
        setSelectedEvent(event);
    };

    const updateEventHandler = async () => {
        try {
            await updateEvent(selectedEvent.id, newDate, newLocation);
            // Actualizar el estado de las citas del usuario después de la modificación
            const updatedEvents = userEvents.map(event => {
                if (event.id === selectedEvent.id) {
                    return { ...event, date: newDate, location: newLocation };
                }
                return event;
            });
            setUserEvents(updatedEvents);
            setSelectedEvent(null); // Limpiar la cita seleccionada después de la actualización
        } catch (error) {
            console.error("Error al actualizar la cita:", error);
        }
    };

    return (
        <>
            <div>
                <h2>Your Events</h2>
                {userEvents.length > 0 ? (
                    <ul>
                        {userEvents.map(event => (
                            <div className="eventList" key={event.id}>
                                <p>APPOINTMENT ID: {event.id}</p>
                                <p>Date {event.date}</p>
                                <p>Hour {event.location
                                }</p>
                                <button onClick={() => modifyEventHandler(event)}>Modify</button>
                            </div>
                        ))}
                    </ul>
                ) : (
                    <p>No hay eventos disponibles para este usuario.</p>
                )}
            </div>

            {selectedEvent && (
                <div className="modifyForm">
                    <h3>Modificar Cita</h3>
                    <input placeholder="Date" type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
                    <input placeholder="Hour" type="time" value={newHour} onChange={(e) => setNewLocation(e.target.value)} />
                    <button onClick={updateEventHandler}>Guardar Cambios</button>
                </div>
            )}
        </>
    );
};
