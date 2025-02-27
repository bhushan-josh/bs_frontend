import { UserDisplayProps } from "./Type";

const UserDisplay: React.FC<UserDisplayProps> = ({ user, error }) => {
  console.log(error);
  return user.map((user) => {
    return (
      <>
        <hr />
        <div>
          <div key={user.id}>
            <p>
              <strong>
                {user.first_name} {user.last_name}
              </strong>
            </p>
            <p>{user.email}</p>
          </div>
        </div>
      </>
    );
  });
};

export default UserDisplay;
