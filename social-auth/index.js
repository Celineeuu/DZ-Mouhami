/*import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import "./index.css";

const { REACT_APP_BACKEND_API_URL } = process.env;

const SocialAuth = () => {
  let location = useLocation();
  console.log("location", location);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const values = queryString.parse(location.search);
    const code = values.code ? values.code : null;

    if (code) {
      onGogglelogin();
    }
    console.log("c'est backend ", REACT_APP_BACKEND_API_URL)
  }, []);

  const googleLoginHandler = (code) => {
    return axios
      .get(`${REACT_APP_BACKEND_API_URL}/api/auth/google/${code}`)
      .then((res) => {
        localStorage.setItem("googleFirstName", res.data.user.first_name);
        return res.data;
      })
      .catch((err) => {
        setError(err);
        return err;
      });
  };
  

  const onGogglelogin = async () => {
    try {
      const response = await googleLoginHandler(location.search);
        console.log("c'est le user data")
        console.log(response.data)
        console.log("voici response")
        console.log(response)
      if (response && response.data && response.data.access) {
        const userId = response.data.user.id;
        const redirectUrl = `/${userId}`
        navigate(redirectUrl);
      } else {
        console.error("Access property not found in the response data");
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      setError(error.message || "An error occurred during login");
    }
  };
  

  return (
    <div className="loading-icon-container">
      <div className="loading-icon">
        <div className="loading-icon__circle loading-icon__circle--first"></div>
        <div className="loading-icon__circle loading-icon__circle--second"></div>
        <div className="loading-icon__circle loading-icon__circle--third"></div>
        <div className="loading-icon__circle loading-icon__circle--fourth"></div>
      </div>
        <small className=" text-center mr-2">
          Just a moment
        </small>
    </div>
  );
};


export default SocialAuth;*/

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import "./index.css";

const BACKEND_API_URL = "http://127.0.0.1:8000";

const SocialAuth = () => {
  const location = useLocation();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const values = queryString.parse(location.search);
    const code = values.code ? values.code : null;

    if (code) {
      googleLoginHandler(code);
    }
  }, [location.search]);

  const googleLoginHandler = (code) => {
    axios
      .get(`${BACKEND_API_URL}/api/auth/google/`, {
        params: { code: code }, 
      })
      .then((res) => {
        console.log("res", res);
        localStorage.setItem("goggleFirstName", res.data.user.first_name);
        navigate("/loginuser/");
      })
      .catch((err) => {
        console.log("error", err);
        // Handle error as needed
      });
  };

  return (
    <div className="loading-icon-container">
      <div className="loading-icon">
        <div className="loading-icon__circle loading-icon__circle--first"></div>
        <div className="loading-icon__circle loading-icon__circle--second"></div>
        <div className="loading-icon__circle loading-icon__circle--third"></div>
        <div className="loading-icon__circle loading-icon__circle--fourth"></div>
      </div>
      <small className=" text-center mr-2">Just a moment</small>
    </div>
  );
};

export default SocialAuth;