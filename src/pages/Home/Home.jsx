import { useEffect, useState } from "react";
import './Home.css'
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { login, userData1 } from "../userSlice";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../services/apicall";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import Button from 'react-bootstrap/Button'; // Importar el componente Button de Bootstrap
import Form from 'react-bootstrap/Form'; // Importar el componente Form de Bootstrap

//VISTA login
export const Home = () => {
    const [artists, setArtists] = useState([]);
    const [userData, setUserData] = useState({
        email: "", 
        password: "",
    });

    //instancia redux en modo escritura
    const dispatch = useDispatch()

    //instancia redux en modo lectura
    const userRdxData = useSelector(userData1)

    const inputHandler = (event) => {
        setUserData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const navigate = useNavigate()

    const buttonHandler = () => {
        userLogin(userData).then((token) => {
            const decodedtoken = jwtDecode(token)
            const data = {
                token: token,
                userData: decodedtoken
            }
            dispatch(login(data))
            navigate('/profile')
        })
        .catch((err) => console.error('ha ocurrido un error', err))
    };

    useEffect(() => {
       
    }, [artists]);

    useEffect(() => {
    }, [userData]);

    return (
        <>
            <h1 className="welcome">LOCAL MUSIC EXPERIENCE</h1>
            <div className="midiv">
                <Form>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            name="email" 
                            value={userData.email} 
                            onChange={inputHandler} 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            name="password" 
                            value={userData.password} 
                            onChange={inputHandler} 
                        />
                    </Form.Group>
                </Form>

                <Button variant="light" className="apiCallButton" onClick={buttonHandler}>
                   Let's Go
                </Button>
            </div>
        </>
    );
};
