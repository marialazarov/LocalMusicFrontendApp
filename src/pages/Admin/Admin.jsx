import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bringAllUsers, deleteUser } from "../../services/apicall";
import { userData1 } from "../userSlice";
import UserCard from "../../components/UserCard/UserCard";
import './Admin.css'
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap"; // Importa Modal y Button de react-bootstrap
import { Icon } from "@iconify/react";

export const Admin = () => {
    const [users, setUsers] = useState([]);
    const [usersPage, setUsersPage] = useState(1);
    const [usersSkip, setUsersSkip] = useState(3);
    const [usersCount, setUsersCount] = useState();
    const [searchTerm, setSearchTerm] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false); // Nuevo estado para controlar la visibilidad del modal
    const [userIdToDelete, setUserIdToDelete] = useState(null); // Nuevo estado para almacenar el ID del usuario a eliminar
    const dispatch = useDispatch();
    const userRdxData = useSelector(userData1);
    const token = userRdxData.token;
    const decoded = userRdxData.userData;
    const navigate = useNavigate();

    const handleDeleteUser = async (id) => {
        setShowDeleteModal(true); // Abrir modal de confirmación
        setUserIdToDelete(id); // Almacenar el ID del usuario a eliminar
    };

    const confirmDeleteUser = async () => {
        try {
            await deleteUser(token, userIdToDelete); // Eliminar el usuario
            const updatedUsers = users.filter(user => user.id !== userIdToDelete); // Filtrar los usuarios para excluir al eliminado
            setUsers(updatedUsers);
            setShowDeleteModal(false); // Cerrar modal de confirmación
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
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
    }, [decoded, token, usersPage, usersSkip, navigate]);

    const getUsersPaginated = async (page, skip) => {
        const res = await bringAllUsers(token, page, skip);
        setUsers(res.results);
        setUsersPage(res.page);
        setUsersSkip(res.skip);
        setUsersCount(res.count);
    };

    const buttonHandlerPrev = () => {
        if (usersPage <= 1) {
            return;
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
         <InputGroup className="mb-3">
                <FormControl
                    placeholder="Buscar por nombre de usuario"
                    aria-label="Buscar por nombre de usuario"
                    aria-describedby="basic-addon2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline-secondary"><Icon icon="bi:search-heart" /></Button>
            </InputGroup>
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
            {/* Agrega los botones prev y next */}
            <div>
                <button onClick={buttonHandlerPrev} disabled={usersPage <= 1}>Prev</button>
                <button onClick={buttonHandlerNext} disabled={usersPage * usersSkip >= usersCount}>Next</button>
            </div>
            {/* Modal de confirmación de eliminación */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Body>¿Estás seguro de que deseas eliminar este usuario?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
                    <Button variant="danger" onClick={confirmDeleteUser}>Eliminar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Admin;

