import axios from "axios";

const URL = "http://localhost:3000/groups";

const JWT_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTJ9.an2JgAw2FQrENQY5TDEdENfoMGV3Cl4yfE7qGP9fZPs";

const fetchUsers = async () => {
  try {
    const response = await axios.get(URL, {
      headers: {
        Authorization: JWT_TOKEN, 
        Accept: "application/vnd.billsplitter.com; version=1", 
        "Content-Type": "application/json",
      },
    });

    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
};

export default fetchUsers;
