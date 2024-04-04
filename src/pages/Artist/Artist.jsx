import { useState, useEffect } from "react";
import "./Artist.css";
import { ArtistCard } from "../../components/ArtistCard/ArtistCard";
import { useNavigate } from "react-router-dom";
import { bringAllArtists } from "../../services/apicall";

export const Artist = () => {
    const [artists, setArtists] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (artists.length === 0) {
            bringAllArtists().then((artistsData) => {
                setArtists(artistsData.userArtistIds); // Asumiendo que los artistas están en userArtistIds
            }).catch(error => console.error("Error al traer los artistas:", error));
        }
    }, [artists]);

    const viewArtistDetail = (artistId) => {
        navigate(`/artist/${artistId}`);
    };

    return (
        <div>
            <div className="artistas">
                {artists.length > 0 ? (
                    artists.map((artist) => (
                        <div key={artist.id} className="artist-card" onClick={() => viewArtistDetail(artist.id)}>
                            <ArtistCard
                                id={artist.id}
                                name={artist.name}
                                music={artist.music}
                                genre={artist.genre}
                            />
                        </div>
                    ))
                ) : (
                    <p>No hay artistas disponibles.</p>
                )}
            </div>
        </div>
    );
};
