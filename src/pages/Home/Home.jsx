
import { useEffect, useState } from "react";
import "./Home.css";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { userData1 } from "../userSlice";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../services/apicall";
import { CustomInput } from "../../components/CustomInput/CustomInput";


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
            ...prevState, //haz una copia del estado actual
            [event.target.name]: event.target.value, //busca una copia que se llame asi y pon el valor de quien haya disparado el evento
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
        <img className="logohome" src=""></img>
            <h1 className="welcome">LOCAL MUSIC EXPERIENCE</h1>
            <div className="midiv">
                <CustomInput
                placeholder={'email'}
                    type={"email"}
                    name={"email"}
                    handler={inputHandler}
                ></CustomInput>
                <CustomInput
                placeholder={'password'}
                    type={"password"}
                    name={"password"}
                    handler={inputHandler}
                ></CustomInput>

                <button className="apiCallButton" onClick={buttonHandler}>
                    <h4>LOGIN</h4> 
                </button>

            </div>
        </>
    );
};

