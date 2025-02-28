import { getAuthHeaders } from "../friends/api";
import axios from "axios";

const API_URL = "http://localhost:3000/"; 

export const getUserData = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`, {
      headers: getAuthHeaders(),
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};