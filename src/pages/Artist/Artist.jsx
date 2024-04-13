import React, { useState, useEffect } from "react";
import "./Artist.css";
import { ArtistCard } from "../../components/ArtistCard/ArtistCard";
import { useNavigate } from "react-router-dom";
import { bringAllArtists } from "../../services/apicall";
import Button from 'react-bootstrap/Button';

export const Artist = () => {
    const [artists, setArtists] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [artistsPerPage] = useState(5); // Define el número de artistas por página
    const navigate = useNavigate();

    useEffect(() => {
        if (artists.length === 0) {
            bringAllArtists().then((artistsData) => {
                setArtists(artistsData.userArtistIds); // Asumiendo que los artistas están en userArtistIds
            }).catch(error => console.error("Error al traer los artistas:", error));
        }
    }, [artists]);

    const navigateToMyEvents = () => {
        navigate('/everyevent');
    };

    // Calcula el índice del último artista en la página actual
    const indexOfLastArtist = currentPage * artistsPerPage;
    // Calcula el índice del primer artista en la página actual
    const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
    // Obtiene los artistas de la página actual
    const currentArtists = artists.slice(indexOfFirstArtist, indexOfLastArtist);

    // Cambia la página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <h1 className="titulo2">ARTISTAS EN LA CIUDAD</h1>
            <div className="artistas">
                {currentArtists.length > 0 ? (
                    currentArtists.map((artist) => (
                        <div key={artist.id} className="artist-card" onClick={() => navigateToMyEvents()}>
                            <ArtistCard
                                id={artist.id}
                                name={artist.name}
                                music={artist.music}
                                genre={artist.genre}
                                handler={navigateToMyEvents}
                            />
                        </div>
                    ))
                ) : (
                    <p>No hay artistas disponibles.</p>
                )}
            </div>

            <div className="pagination">
                {artists.length > 0 && (
                    <div className="buttonContainer">
                        {Array.from({ length: Math.ceil(artists.length / artistsPerPage) }, (_, i) => (
                            <Button key={i + 1} variant="light" className="pagination-button" onClick={() => paginate(i + 1)}>{i + 1}</Button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
