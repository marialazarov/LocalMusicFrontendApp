// UserCard.jsx
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const UserCard = ({ id, name, username, email, deleteUserHandler }) => {
  return (
    <Card style={{ width: '18rem' }} className='cardContainer'>
      <Card.Img variant="top" src='https://media4.giphy.com/media/l41lGtNHF5etg5B0Q/200.webp?cid=ecf05e476gzqoub48ft162net7o8dnr25o60ivan41b1mlbj&ep=v1_gifs_search&rid=200.webp&ct=g' />
      <Card.Body>
        <Card.Title>{username}</Card.Title>
        <Card.Text>
         Este es el usuario {name}, con id {id} y email {email}.
        </Card.Text>
        <Button variant="danger" onClick={() => deleteUserHandler(id)}>Eliminar</Button>
      </Card.Body>
    </Card>
  );
}

export default UserCard;
