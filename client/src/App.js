import './styling/style.css';
import HomeView from './views/HomeView';
import SignUpView from './views/SignUpView';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomeView />}></Route>
        <Route path='/login' element={<SignUpView />}></Route>
      </Routes>
    </Router>
  );
}

export default App;