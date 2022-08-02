import React, {useEffect} from 'react'
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
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
    <BrowserRouter>
        <Routes>
            <Route path='/login' element={<LoginForm/>}/>
            <Route exact path='/' element={<RegForm/>}/>
            {store.isAuth? <Route path='/chat' element={<Chat/>}/> : <Route exact path='/' element={<RegForm/>}/>}
            <Route exact strict path="*" element={<h1>404. page not found</h1>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default observer(App)