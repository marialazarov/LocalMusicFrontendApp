import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './ArtistCard.css'
export const ArtistCard = ({img,name,genre,music,events,id,handler}) => {
  return (
    <Card  style={{ width: '18rem' }} className='profilecard1'>
      <Card.Img className='logoartista' variant="top" src='https://media4.giphy.com/media/l41lGtNHF5etg5B0Q/200.webp?cid=ecf05e476gzqoub48ft162net7o8dnr25o60ivan41b1mlbj&ep=v1_gifs_search&rid=200.webp&ct=g' />
      <Card.Body>
        <Card.Title><h1>{music}</h1><h1>ID NÚMERO {id}</h1></Card.Title>
        <Card.Text className='text'>
         El artista {name}, con un sonido que se encuentra en el género  {genre}. Podrás encontrarlo en la ciudad en las próximas fechas. ¡No te lo pierdas!
        </Card.Text>
        <Button variant="light" onClick={handler}>Conciertos </Button>
      </Card.Body>
    </Card>
  );
}

export default ArtistCard;