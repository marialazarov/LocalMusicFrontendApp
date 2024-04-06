
import { useDispatch, useSelector } from "react-redux";

import './Admin.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { userData1 } from "../userSlice";
import { bringAllUsers, deleteUser } from "../../services/apicall";

export const Admin = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // Estado para almacenar el término de búsqueda
    const dispatch = useDispatch();
    const userRdxData = useSelector
    (userData1)
    const token = userRdxData.token
    const decoded = userRdxData.userData
    const navigate = useNavigate();

    const deleteUserHandler = async (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
        if (confirmDelete) {
            try {
                await deleteUser
                (token, id);
                bringAllUsers(token).then((res) => {
                    setUsers(res);
                });
            } catch (error) {
                console.error("Error al eliminar el usuario:", error);
            }
        }
    };


    useEffect(() => {
        if (decoded.userRoles === "client") {
            navigate("/");
        } else {
            bringAllUsers(token).then((res) => {
                setUsers(res);
            });
        }
    }, []);
   

    // Función para filtrar los usuarios según el término de búsqueda
    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="adminDesign">
                <input
                    type="text"
                    placeholder="Buscar usuario..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Actualizar el estado del término de búsqueda al escribir
                />
                <div className="userList">
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <div className="userRow" key={user.id}>
                                <div>
                                    <h6>Id: {user.id}</h6>
                                    <h6>Username: {user.username}</h6>
                                    <h6>Email: {user.email}</h6>
                                </div>
                                <div className="deleteButton">
                                    <button onClick={() => deleteUserHandler(user.id)}>Eliminar</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No se encontraron usuarios</p>
                    )}
                </div>
            </div>
        </>
    );
};
