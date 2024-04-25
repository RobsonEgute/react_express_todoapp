import './App.css';
import React, {useEffect, useState} from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login'
import Register from './pages/Register';
import Logout from './pages/Logout';

function App() {
const [isLoggedIn, setIsLoggedIn] = useState(false);
console.log(isLoggedIn);
const styles = {
  container: {
    'width': '80%',
    'height': 'min(100vh)',
   // 'backgroundColor': 'Skyblue',
    'margin': 'auto'
  }
}
  useEffect(() => {
    
  }, [])

  return (
    <div className="App" style={styles.container}>
    <Router>
<nav>
  {isLoggedIn
   ? <ul><Link to="/home" element={<Home/>}>Home</Link> <Link to="/logout" element={<Logout/>}>Logout</Link></ul>
   : <ul><Link to="/home" element={<Home/>}>Home</Link> <Link to="/login" element={<Login/>}>Login</Link> <Link to="/register" element={<Register/>}>Register</Link></ul> }
</nav>

      <Routes>
      {// Add to do here
      }
        <Route path="/home" element={<Home/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        
      </Routes>
    </Router>
      
    </div>
  );
}

export default App;
