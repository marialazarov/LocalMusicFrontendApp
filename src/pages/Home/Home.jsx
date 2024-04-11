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
            <h1 className="welcome">TALENTO LOCAL</h1>
    
            <div className="midiv">
            <img className="corazón" src="https://images.vexels.com/media/users/3/141429/isolated/preview/20c78a998fb4436267015fd554301480-corazon-alado.png"></img>
                <Form>
                <div className="midiv">
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            name="email" 
                            value={userData.email} 
                            onChange={inputHandler} 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                       
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            name="password" 
                            value={userData.password} 
                            onChange={inputHandler} 
                        />
                    </Form.Group>
                    <Button variant="dark"  onClick={buttonHandler}>
                   OKEY
                </Button>
                    </div>
                </Form>

              
            </div>
        </>
    );
};
