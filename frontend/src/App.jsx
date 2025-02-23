import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import './App.css'
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import DashboardPage from "./components/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/dashboard' element={<ProtectedRoute element={<DashboardPage/>}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
