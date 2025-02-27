import { GroupDisplayProps } from "./Type";

const GroupDisplay: React.FC<GroupDisplayProps> = ({ group, error }) => {
  console.log(error);
  return group.map((group) => {
    return (
      <>
        <hr />
        <div>
          <div key={group.id} className="card">
            <p>
              <strong>{group.name}</strong>
            </p>
            <p>{group.description}</p>
          </div>
        </div>
      </>
    );
  });
};

export default GroupDisplay;
