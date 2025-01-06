import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainPage from './App';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import UserLoginPage from './page/UserLoginPage'
import UserRegisterPage from './page/UserRegisterPage'
import CreateTopicPage from './page/CreateTopicPage'
import EditTopicPage from './page/EditTopicPage'
import TopicPage from './page/TopicPage'
import ScrollToTop from './component/ScrollToTop';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path='/' element={<MainPage />}/>
      <Route path='/:id' element={<TopicPage />}/>
      <Route path='/login' element={<UserLoginPage />}/>
      <Route path='/register' element={<UserRegisterPage />}/>
      <Route path='/create' element={<CreateTopicPage />}/>
      <Route path='/edit/:id' element={<EditTopicPage />}/>
    </Routes>
  </BrowserRouter>
);
