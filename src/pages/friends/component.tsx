import { UserDisplayProps } from "./Type";
import "./usercss.css";

const UserDisplay: React.FC<UserDisplayProps> = ({ user, error }) => {
  console.log(error);
  return user.map((user) => {
    return (
      <>
        <hr/>
        <div className="container">
          <div className="users">
            <div key={user.id} className="card">
              <img src={user.avatar} alt={user.first_name} className="img" />
              <p className="user_details">
                <strong>
                  {user.first_name} {user.last_name}
                </strong>
              </p>
              <p className="user_details">{user.email}</p>
            </div>
          </div>
        </div>
      </>
    );
  });
};

export default UserDisplay;