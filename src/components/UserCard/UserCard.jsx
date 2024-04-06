// UserCard.jsx
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const UserCard = ({ id, name, username, email, deleteUserHandler }) => {
  return (
    <Card style={{ width: '18rem' }} className='cardContainer'>
      <Card.Img variant="top" src='https://media2.giphy.com/media/HEjVImqraknaPUkYAX/giphy.webp?cid=ecf05e47lc8o2ngmeqf0jc7pa0ziuk98n2f9s2vrr3z7zqg4&ep=v1_gifs_search&rid=giphy.webp&ct=g' />
      <Card.Body>
        <Card.Title>{username}</Card.Title>
        <Card.Text>
         Este es el usuario con ID nº {id}. Dirección de email {email}. 
    
        </Card.Text>
        <Button variant="danger" onClick={() => deleteUserHandler(id)}>Eliminar</Button>
      </Card.Body>
    </Card>
  );
}

export default UserCard;
