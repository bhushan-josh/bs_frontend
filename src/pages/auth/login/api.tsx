import axios from "axios";

const API_URL = "http://localhost:3000"; // Update to your actual API endpoint

// Hardcoded user credentials
const CREDENTIALS = {
  email: "nagpureb7@gmail.com",
  password: "qwertyuiop",
};

// Headers for API requests
const HEADERS = {
  Accept: "application/vnd.billsplitter.com; version=1",
  "Content-Type": "application/json",
};

// Login function
export const loginUser = async (): Promise<string | null> => {
  try {
    const response = await axios.post(`${API_URL}/login`, CREDENTIALS, {
      headers: HEADERS,
    });

    if (response.data.success) {
      const token = response.data.data.token; // Extract token correctly
      localStorage.setItem("jwt", token); // Save token to localStorage
      console.log("JWT Token Saved:", token);
      return token;
    } else {
      console.error("Login failed:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
};
