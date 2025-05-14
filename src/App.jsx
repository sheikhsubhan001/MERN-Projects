import { } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import AddUser from './Pages/AddUser';
import UpdateUser from './Pages/UpdateUser';
import "C:/Users/ssm15/Desktop/CRUD/FRONT/todolist/src/App.css"



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
