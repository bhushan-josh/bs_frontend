import { jwtDecode } from "jwt-decode";

export const getDecodedToken = () => {
  const token = localStorage.getItem("token"); // Retrieve token
  return token ? jwtDecode(token) : null; // Decode or return null
};


// const decodedToken = getDecodedToken();
// console.log(decodedToken)