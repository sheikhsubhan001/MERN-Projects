import {} from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import AddUser from './Pages/AddUser';
import UpdateUser from './Pages/UpdateUser';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/add' element={<AddUser />} />
          <Route path='/Update/:id' element={<UpdateUser /> } />
          
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
