import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyle from "./GlobalStyle";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import ShareMyBook from "./components/ShareMyBook";
import Loading from "./components/Loading";
import InformationPage from "./components/InformationPage";

function App() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedAuthCode = localStorage.getItem("key");
    if (storedUsername && storedAuthCode) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/user?user=${storedUsername}&key=${storedAuthCode}`,
          {}
        )
        .then((response) => {
          if (response.data.result === "success") {
            setUsername(storedUsername);
          } else {
            localStorage.removeItem("username");
            localStorage.removeItem("key");
          }
        })
        .catch((error) => {
          localStorage.removeItem("username");
          localStorage.removeItem("key");
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
    return <Loading />;
  }

  return (
    <Router>
      <GlobalStyle />
      <div className="app">
        <Routes>
          <Route
            path="/story-editor"
            element={
              username ? (
                <MainPage onLogin={setUsername} showToast={showToast} />
              ) : (
                <Login onLogin={setUsername} showToast={showToast} />
              )
            }
          />
          <Route path="/share" element={<ShareMyBook />} />
          <Route path="/" element={<InformationPage />} />
        </Routes>

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
    </Router>
  );
}

export default App;
