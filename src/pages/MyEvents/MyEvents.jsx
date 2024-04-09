import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userData1 } from "../userSlice";
import { bringEventById } from "../../services/apicall";

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
                    console.error("No se encontró el ID del usuario en el localStorage");
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

    return (
        <>
            <div>
                <h2>Tus Eventos</h2>
                {userEvents.length > 0 ? (
                    <ul>
                        {userEvents.map(event => (
                            <div className="eventList" key={event.id}>
                                <p>Fecha: {event.date}</p>
                                <p>Hora: {event.location}</p>
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
