import React from 'react';
import { CardText } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './EventCard.css';

// Función para formatear la fecha en un formato legible
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const EventCard = ({ artist_id, location, date, handler }) => {
    return (
        <Card style={{ width: '18rem' }} className='profilecard2'>
            <Card.Img className='logoartista' variant="top" src='https://media2.giphy.com/media/HEjVImqraknaPUkYAX/giphy.webp?cid=ecf05e47lc8o2ngmeqf0jc7pa0ziuk98n2f9s2vrr3z7zqg4&ep=v1_gifs_search&rid=giphy.webp&ct=g' />
            <Card.Body>
                <Card.Title><h1>{location}</h1></Card.Title>
                <Card.Title><h1>{formatDate(date)}</h1></Card.Title>
                <Card.Title><h1>ARTIST ID: {artist_id}</h1></Card.Title>
                <CardText className='text' > Si quieres apoyar este artista<br />¡No te lo pierdas en directo!</CardText>
                <Button className='boton3' variant='light' onClick={handler}>Asistir al evento</Button>
            </Card.Body>
        </Card>
    );
}

export default EventCard;
