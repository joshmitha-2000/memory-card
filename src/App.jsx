import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Newgame from './newgame.jsx';
import Home from './home.jsx';

function App() {
  const location = useLocation(); // Get the current location

  return (
    <nav>
      {/* Render the image only if the current path is not "/" */}
      {location.pathname !== '/' && (
        <Link to="/">
          <img 
            height="30px" 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSivucB7RSQlK8aXSaAar_mXwrDyv_k5WvR_Q&s" 
            alt="Home" 
            style={{ cursor: 'pointer', marginLeft:'1%', marginTop:'1%'}} // Make the cursor change to a pointer
          />
        </Link>
    
      )}
    </nav>
  );
}

// Wrap the App component with Router in a separate component
function AppWrapper() {
  return (
    <Router>
      <App />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Newgame />} />
        
      </Routes>
    </Router>
  );
}

export default AppWrapper;
