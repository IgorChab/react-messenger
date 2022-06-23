import React from 'react';
import ReactDOM from 'react-dom/client';
import RegForm from './components/Forms/RegForm';
import Chat from './components/Chat/Chat';
import LoginForm from './components/Forms/LoginForm';
import 'antd/dist/antd.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<RegForm/>}/>
      <Route path='/auth' element={<LoginForm/>}/>
      <Route path='/chat' element={<Chat/>}/>
    </Routes>
  </BrowserRouter>
);

