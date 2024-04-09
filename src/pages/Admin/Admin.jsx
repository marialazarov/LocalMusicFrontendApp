import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bringAllUsers, deleteUser } from "../../services/apicall";
import { userData1 } from "../userSlice";
import UserCard from "../../components/UserCard/UserCard";
import './Admin.css'

export const Admin = () => {
    const [users, setUsers] = useState([]);
    const [usersPage, setUsersPage] = useState(1);
    const [usersSkip, setUsersSkip] = useState(3);
    const [usersCount, setUsersCount] = useState();
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();
    const userRdxData = useSelector(userData1);
    const token = userRdxData.token;
    const decoded = userRdxData.userData;
    const navigate = useNavigate();

    const handleDeleteUser = async (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
        if (confirmDelete) {
            try {
                await deleteUser(token, id);
                const updatedUsers = users.filter(user => user.id !== id);
                setUsers(updatedUsers);
            } catch (error) {
                console.error("Error al eliminar el usuario:", error);
            }
        }
    };

    useEffect(() => {
        if (decoded.userRoles === "client") {
            navigate("/");
        } else {
            bringAllUsers(token, usersPage, usersSkip).then((res) => {
                setUsers(res.results);
                setUsersPage(res.page);
                setUsersSkip(res.skip);
                setUsersCount(res.count);
            });
        }
       
    }, [decoded, token, usersPage, usersSkip, navigate]); // Añade dependencias faltantes

    const getUsersPaginated = async (page, skip) => {
        const res = await bringAllUsers(token, page, skip);
        setUsers(res.results);
        setUsersPage(res.page);
        setUsersSkip(res.skip);
        setUsersCount(res.count);
    };

    const buttonHandlerPrev = () => {
        if (usersPage <= 1) {
            return; // Cambiado a return para salir de la función si ya estamos en la primera página
        }
        const page = usersPage - 1;
        getUsersPaginated(page, usersSkip);
    };

    const buttonHandlerNext = () => {
        const page = usersPage + 1;
        getUsersPaginated(page, usersSkip);
    };

   const filteredUsers = (users || []).filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
   );

    return (
        <div className="adminDesign">
            <input className="buscador"
                type="text"
                placeholder="Buscar por nombre de usuario"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="userList">
                {filteredUsers.length > 0 ? (
                    filteredUsers
                    .map((user) => (
                        <UserCard
                            key={user.id}
                            id={user.id}
                            name={user.name}
                            username={user.username}
                            email={user.email}
                            deleteUserHandler={handleDeleteUser}
                        />
                    ))
                ) : (
                    <p>No se encontraron usuarios</p>
                )}
            </div>
            {/* Agrega los botones prev y next */}
            <div>
                <button onClick={buttonHandlerPrev} disabled={usersPage <= 1}>Prev</button>
                <button onClick={buttonHandlerNext} disabled={usersPage * usersSkip >= usersCount}>Next</button>
            </div>
        </div>
    );
};

export default Admin;
