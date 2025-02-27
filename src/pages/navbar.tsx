import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/friends">Friends</Link>
      </div>
      <div>
        <Link to="/groups">Groups</Link>
      </div>
      <div>
        <Link to="/transactions">Transactions</Link>
      </div>
      <div>
        <Link to="/profile">Profile</Link>
      </div>
    </div>
  );
};

export default Navbar;
