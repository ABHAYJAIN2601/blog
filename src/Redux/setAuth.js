import axios from "axios";
// import jwt from "jsonwebtoken";
const setAuthToken = (token) => {
    if (token) {
      
        axios.defaults.headers.common["token"] = token;
    } else {
        delete axios.defaults.headers.common["token"];
    }
};

export default setAuthToken;