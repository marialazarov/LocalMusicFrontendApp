// Admin.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bringAllUsers, deleteUser } from "../../services/apicall";
import { userData1 } from "../userSlice";
import UserCard from "../../components/UserCard/UserCard";



export const Admin = () => {
    const [users, setUsers] = useState([]);
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
            bringAllUsers(token).then((res) => {
                setUsers(res);
            });
        }
    }, [decoded, navigate, token]);

    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="adminDesign">
            <input
                type="text"
                placeholder="Buscar usuario..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="userList">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
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
        </div>
    );
};

export default Admin;
