import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout, updateUserData, userData1 } from '../userSlice';
import { bringUserById, updateProfile } from '../../services/apicall';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import Button from 'react-bootstrap/Button';
import { Icon } from '@iconify/react';

export const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userRdxData = useSelector(userData1);
    const token = userRdxData.token;
    const decoded = userRdxData.userData;
    const myid = userRdxData.userData.userId;

    console.log(decoded);
    
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(decoded.name);
    const [newEmail, setNewEmail] = useState(decoded.email);
    const [newUserName, setNewUserName] = useState(decoded.username);

    useEffect(() => {
        if (!decoded) {
            navigate('/register');
        }
    }, []);
        
    const handleUpdateProfile = async () => {
        try {
            const updatedUserData = await updateProfile(token, myid, {
                username: newUserName,
                name: newName,
                email: newEmail,
            });
            dispatch(updateUserData(updatedUserData));
            setIsEditing(false);
            console.log("Perfil actualizado correctamente:", updatedUserData);
        } catch (error) {
            console.error("Error al actualizar el perfil:", error);
        }
    };

    const handleEditProfile = () => {
        setIsEditing(true);
    };
    
    const handleCancelEdit = () => {
        setIsEditing(false);
        // Restaurar los valores originales del usuario al cancelar la edición
        setNewName(decoded.name);
        setNewEmail(decoded.email);
        setNewUserName(decoded.username);
    };


    const navigateToArtists = () => {
        navigate('/artist');
      };
      const navigateToMyEvents = () => {
        navigate('/everyevent');
      };

    return (
        <div className="profileDesign">
            <ProfileCard
                name={decoded.name}
                username={decoded.username}
                email={decoded.email}
                role={decoded.role}
                id={myid}
                handler2 = {navigateToArtists
                }
                handler1={navigateToMyEvents}


            />
            <div>
                {isEditing ? (
                    <>
                        <input className="newValue" type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
                        <input className="newValue" type="text" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
                        <input className="newValue" type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                        <button onClick={handleUpdateProfile}>Guardar</button>
                        <button onClick={handleCancelEdit}>Cancelar</button>
                    </>
                ) : (
                    <>
            <Button className="editarperfil" variant="light"  onClick={handleEditProfile}>
            <Icon icon="bx:edit" />
            </Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;
