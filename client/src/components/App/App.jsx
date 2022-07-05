import React, {useEffect} from 'react'
import { BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import RegForm from '../Forms/RegForm';
import Chat from '../Chat/Chat';
import LoginForm from '../Forms/LoginForm';
import { useContext } from 'react';
import { Context } from '../..';
import {observer} from 'mobx-react-lite';

function App() {

    const {store} = useContext(Context);

    useEffect(() => {
        if(localStorage.getItem('token')){
            store.checkAuth()
        }
    }, [])


  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<RegForm/>}/>
                <Route path='/login' element={<LoginForm/>}/>
                <Route path='/chat' element={<Chat/>}/>
                <Route exact strict path="*" element={<h1>404. page not found</h1>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default observer(App)