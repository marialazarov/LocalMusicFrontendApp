import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const ArtistCard = ({img,name,genre,music,events}) => {
  return (
    <Card style={{ width: '18rem' }} className='cardContainer'>
      <Card.Img variant="top" src='https://www.shutterstock.com/image-vector/asian-man-listen-music-on-600nw-1566646765.jpg' />
      <Card.Body>
        <Card.Title>{music}</Card.Title>
        <Card.Text>
         El artista {name}, con un sonido que se encuentra en {genre}, podrás encontrarlo en la ciudad en las próximas fechas. ¡No te lo pierdas!
        </Card.Text>
        <Button variant="primary">Conciertos</Button>
      </Card.Body>
    </Card>
  );
}

export default ArtistCard;