import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "./ProfileCard.css";

export const ProfileCard = ({
  img,
  name,
  username,
  email,
  role,
  id,
  handler1,
  handler2,
}) => {
  return (
    <Card className="profilecard" style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src="https://www.parlante.cl/wp-content/uploads/2019/04/1975-live11.png"
      />
      <Card.Body>
        <Card.Title>
          <h1>Hola, {name} !</h1>
        </Card.Title>
        <Card.Text className="text">
          Eres el usuario con el id número {id}. <br />
          Es el número que te servira de identificación para asistir a los
          eventos de tus artistas locales favoritos.
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item className="username">
          USERNAME
          <br /> {username}
        </ListGroup.Item>
        <ListGroup.Item className="username">
          EMAIL <br /> {email}
        </ListGroup.Item>
        <ListGroup.Item className="username">
          ROLE <br />
          {role}
        </ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link className="link" onClick={handler1}>
          Mis eventos
        </Card.Link>
        <Card.Link className="link" onClick={handler2}>
          Artistas
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default ProfileCard;
