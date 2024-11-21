import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyle from './GlobalStyle';
import Login from './components/Login';
import MainPage from './components/MainPage';
import Loading from './components/Loading';

function App() {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedAuthCode = localStorage.getItem('key');
    if (storedUsername && storedAuthCode) {
      axios.post(`${process.env.REACT_APP_API_URL}/user?user=${storedUsername}&key=${storedAuthCode}`, {

      })
      .then((response) => {
        if (response.data.result === "success") {
          setUsername(storedUsername);
        } else {
          localStorage.removeItem('username');
          localStorage.removeItem('key');
        }
      })
      .catch((error) => {
        localStorage.removeItem('username');
        localStorage.removeItem('key');
      })
      .finally(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const showToast = (message, type) => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    } else if (type === "warn") {
      toast.warn(message);
    } else {
      toast.info(message);
    }
  };

  if (isLoading) {
    return (
      <Loading/>
    );
  }

  return (
    <>
      <GlobalStyle />
      <div className="app">
        {username ? (
          <MainPage onLogin={(name) => {
              localStorage.setItem('username', name);
              setUsername(name);
            }}
            showToast={showToast}
          />
        ) : (
          <Login onLogin={(name) => {
              localStorage.setItem('username', name);
              setUsername(name);
            }} 
            showToast={showToast}
          />
        )}

        {/* Toast Container */}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme="dark"
        />
      </div>
    </>
    
  );
}

export default App;
