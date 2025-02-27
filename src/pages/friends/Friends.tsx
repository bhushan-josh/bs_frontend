import { useState, useEffect } from "react";
import fetchUsers from "./api";
import { User } from "./Type";
import UserDisplay from "./component";


const Friends: React.FC = () => {
  const [user, setUser] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers()
      .then((data) => setUser(data))
      .catch((error) => {
        setError(error.message || "Something went wrong");
      });
  }, []);

  return (<>
    <h1> User Details </h1>
    <UserDisplay user = {user} error = {error} />
  </>
  )
};

export default Friends;