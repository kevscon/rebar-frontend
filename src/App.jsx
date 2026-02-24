import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Properties from './components/Properties';
import DevLap from './components/DevLap';

const App = () => {
  return (
    <Router>
      <div className="container mt-5">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">

            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active fw-bold text-dark" : "")
                }
              >
                Properties
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/dev-lap"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active fw-bold text-dark" : "")
                }
              >
                Dev/Lap
              </NavLink>
            </li>

          </ul>
        </div>
      </nav>

        <Routes>
          <Route path="/" element={<Properties />} />
          <Route path="/dev-lap" element={<DevLap />} />
        </Routes>
      </div>
    </Router>
  );  
};

export default App;