
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout, updateUserData, userData1 } from '../userSlice';
import { bringUserById, updateProfile } from '../../services/apicall';
import { useEffect, useState } from 'react';


export const Profile = () => {
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userRdxData = useSelector(userData1);
    const token = userRdxData.token;
    const decoded = userRdxData.userData;
    const myid = userRdxData.userData.userId;
   
console.log(decoded)
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
            const updatedUserData = await updateProfile(token, myid,{
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

    return (
        
        <div className="profileDesign">
            <h1>Hello, {decoded.username}</h1>
            <br />
            <h4>This is your id number: {myid}</h4>
            <br />
            {isEditing ? (
                <>
                <div className="inputs"></div>
                    <h4>Name: <input className="newValue" type="text" value={newName} onChange={(e) => setNewName(e.target.value)} /></h4>
                    <br />
                    <h4>Username: <input className="newValue" type="text" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} /></h4>
                    <h4>Email: <input className="newValue" type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} /></h4>
                    <br />
            
                    <button onClick={handleUpdateProfile}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                    
                </>
            ) : (
                <>
                    <h4>Name: {decoded.name}</h4>
                    
                    <br />
                    <h4>Email: {decoded.email}</h4>
                    <br />
                    <br />
                    <button onClick={handleEditProfile}>Edit Profile</button>
                </>
            )}
        </div>
    );
};

