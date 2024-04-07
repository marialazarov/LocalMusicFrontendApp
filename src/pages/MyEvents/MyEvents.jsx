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

    

    return (
        <>
            <div>
                <h2>Your Events</h2>
                {userEvents.length > 0 ? (
                    <ul>
                        {userEvents.map(event => (
                            <div className="eventList" key={event.id}>
                               
                                <p>Date {event.date}</p>
                                <p>Hour {event.location
                                }</p>
                               
                            </div>
                        ))}
                    </ul>
                ) : (
                    <p>No hay eventos disponibles para este usuario.</p>
                )}
            </div>

    
        </>
    );
};
