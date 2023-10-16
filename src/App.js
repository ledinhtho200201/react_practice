import './App.scss';
import Header from './components/Header';
import TableUsers from './components/TableUsers';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import Home from './components/Home';
import { Routes, Route, Link } from "react-router-dom";
import Login from './components/Login';
import { useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';


function App() {

  const { user, loginContext } = useContext(UserContext);

  console.log('>>>user: ', user);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      loginContext(localStorage.getItem("email"), localStorage.getItem("token"));
    }
  }, [])

  return (
    <div className='app-container'>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<TableUsers />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
