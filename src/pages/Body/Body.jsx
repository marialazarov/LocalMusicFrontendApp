import { Routes, Route, Navigate } from "react-router-dom"
import { Home } from "../Home/Home"
import { Register } from "../Register/Register"
import { Artist } from "../Artist/Artist"
import { Profile } from "../Profile/Profile"
import { Admin } from "../Admin/Admin"
import { Events } from "../Events/Events"




export const Body = () => {


    return (
        <>
            <Routes>
                <Route path="*" element= {<Navigate to="/" />} />
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/artist' element={<Artist />}></Route>
        
                <Route path='/admin' element={<Admin />}></Route>
                <Route path='/createEevents' element={<Events />}></Route>
                <Route path='/myEvents' element={<Events
                 />}></Route>
               
                <Route path='/everyEvent' element={<AdminEvents />}></Route>
        
            </Routes>


        </>
    )
}