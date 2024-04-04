import axios from "axios";
const API_URL= 'http://localhost:3000/api/'
const API_URL2= 'http://localhost:3000/api/events'
const API_URL3 = 'http://localhost:3000/api/users'
const API_URL4 = 'http://localhost:3000/api/artist"'



export const bringAllArtists = async () => {
    const res = await axios.get("http://localhost:3000/api/artist") 
    return res.data
}

export const bringArtistIds = async () => {
    const res = await axios.get(`${API_URL4}/${id}`) 
    return res.data
}
export const deleteUser = async (token, id) => {
    try {
        const res = await axios.delete(`${API_URL}/${id}`, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        return res.data; 
    } catch (error) {
        throw new Error(error.response.data.message || "Error al eliminar el usuario");
    }
};

export const deleteAppointment = async (token, id) => {
    try {
        const res = await axios.delete(`${API_URL2}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data; 
    } catch (error) {
        throw new Error(error.response.data.message || "Error al eliminar la cita");
    }
};

//acceder con autorización solo
export const bringAllUsers = async (token) => {
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    };
    const res = await axios.get("http://localhost:3000/api/users", config);
    return res.data.results;
};

export const bringAllEvents = async (token) => {
 
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    };
    const res = await axios.get("http://localhost:3000/api/events", config);
    return res.data.results;
};



export const createUsers = async (userData) => {
    try {
      const res = await axios.post('http://localhost:3000/auth/register',userData);
      return res.data.user;
    } catch (error) {
      throw error;
    }
  };

export const updateEvent = async (token, id, userData) => {
    try {
        const res = await axios.patch(`${API_URL2}/${id}`, userData, {
            headers: {
                Authorization: "Bearer " + token
            },
        });
        return res.data; 
    } catch (error) {
      throw error;
    }
  };


export const updateProfile = async (token, id, userData) => {
    try {
        const res = await axios.patch(`${API_URL3}/${id}`, userData, {
            headers: {
                Authorization: "Bearer " + token
            },
        });
        return res.data; 
    } catch (error) {
      throw error;
    }
  };



  export const createEvent = async (userData) => {
    try {
      const res = await axios.post('http://localhost:3000/api/events',userData);
      return res.data;
    } catch (error) {
      throw error;
    }
  };

export const bringUserById = async(id)=>{
    const res = await axios.get(`${API_URL3}/${id}`)
    return  res.data.user
    //bringUsersAppointments
}

export const bringEventById = async (userId) => {
    try {
        const res = await axios.get(`${API_URL2}/${userId}`);
        return res.data;
    } catch (error) {
        throw error;
    }
};


//login 
 export const userLogin = async (userData) => {

      const res =  await axios.post('http://localhost:3000/auth/login' , userData)
      const token = res.data.token
      return token
}