// UserCard.jsx
import React from 'react';
import { CardText } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const UserCard = ({ artist_id,location, date, handler}) => {
  return (
    <Card style={{ width: '18rem' }} className='cardContainer'>
      <Card.Img variant="top" src='https://media2.giphy.com/media/HEjVImqraknaPUkYAX/giphy.webp?cid=ecf05e47lc8o2ngmeqf0jc7pa0ziuk98n2f9s2vrr3z7zqg4&ep=v1_gifs_search&rid=giphy.webp&ct=g' />
      <Card.Body>
        <Card.Title>{location}</Card.Title>
        <Card.Title>{date}</Card.Title>
        <Card.Title>ARTIST ID: {artist_id}</Card.Title>
        <CardText> Si quieres apoyar a tus artistas locales, no te lo pierdas!</CardText>
        <button onClick={handler}>Asistir al evento</button>
    

      </Card.Body>
    </Card>
  );
}

export default UserCard;
