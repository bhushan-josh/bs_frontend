import { useState, useEffect } from "react";
import fetchgroups from "./api";
import { Group } from "./Type";
import GroupDisplay from "./component";


const Groups: React.FC = () => {
  const [group, setGroup] = useState<Group[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchgroups()
      .then((data) => setGroup(data))
      .catch((error) => {
        setError(error.message || "Something went wrong");
      });
  }, []);

  return (<>
    <h1> group Details </h1>
    <GroupDisplay group = {group} error = {error} />
  </>
  )
};

export default Groups;