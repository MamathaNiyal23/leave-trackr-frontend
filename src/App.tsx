import React from 'react';
import Home from './page/HomePage/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";  
import SignUp from './page/RegistrationPage/Register';
import Login from './page/LoginPage/Login';
import DashBoard from './page/DashBoard/DashBoard';

function App() {
  return (
    <Router >
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<DashBoard/>}/>
        </Routes>
      </div>
    </Router>
  );


}

export default App;
