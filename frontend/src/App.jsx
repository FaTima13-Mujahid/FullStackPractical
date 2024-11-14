import React from 'react'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Welcome from './Pages/welcome';
import CreateAccount from './Pages/CreateAccount';
import Account from './Pages/Account';
import Error from './Pages/Error';



const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/CreateAccount" element={<CreateAccount />} />
        <Route path="/Account" element={<Account />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App