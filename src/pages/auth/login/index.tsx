import { useEffect, useState } from "react";
import { loginUser } from "./api";

const Login = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const authenticate = async () => {
      const jwt = await loginUser();
      setToken(jwt);
    };

    authenticate();
  }, []);

  return (
    <div>
      <h2>Login</h2>
      {token ? <p>JWT Token Saved!</p> : <p>Logging in...</p>}
    </div>
  );
};

export default Login;
