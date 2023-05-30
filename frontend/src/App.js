import './App.css';
import {Routes, Route} from "react-router-dom"
import Register from "./Register/register"
import Login from "./Login/login"
import UserDashboard from "./userFolder/home"
import ToDoList from './userFolder/toDoList';
import Notes from './userFolder/notes';

function App() {
  return (
      <div className="App">
        <Routes>
          <Route path='/' index element = {<UserDashboard/>}/>
          <Route path='/registeration' element = {<Register/>}/>
          <Route path='/login' element = {<Login/>} />
          <Route path='/List' element={<ToDoList/>}/>
          <Route path='/Notes' element={<Notes/>}/>
        </Routes>
      </div>
  );
}

export default App;
