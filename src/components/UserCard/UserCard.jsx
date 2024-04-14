
import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const UserCard = ({ id, name, username, email, deleteUserHandler }) => {
  return (
    <Card style={{ width: "18rem" }} className="cardContainer">
      <Card.Img
        variant="top"
        src="https://media3.giphy.com/media/l4pTeUh7ioG8TUmac/giphy.webp?cid=790b7611l6bd487f9bibsse3glulvqoiv5hx18c9rdhh5jc2&ep=v1_gifs_search&rid=giphy.webp&ct=g"
      />
      <Card.Body>
        <Card.Title>{username}</Card.Title>
        <Card.Text>
          Este es el usuario con ID nº {id}. Dirección de email {email}.
        </Card.Text>
        <Button variant="danger" onClick={() => deleteUserHandler(id)}>
          Eliminar
        </Button>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
