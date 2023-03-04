import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { getReptiles } from "../api/apiFunctions";
import { Reptile } from "../api/models";
import { CreateReptile } from "./CreateReptile";
import { ErrorMessage } from "./ErrorMessage";
import { HeaderTitle } from "./HeaderTitle";
import { Spinner } from "./Spinner";

export const ReptileList = () => {
  const [reptiles, setReptiles] = useState<Reptile[] | null>();

  const fetchReptiles = () => {
    setReptiles(undefined);
    getReptiles()
      .then((reptiles) => {
        setReptiles(reptiles);
      })
      .catch(() => setReptiles(null));
  };

  useEffect(() => {
    fetchReptiles();
  }, []);

  if (reptiles === undefined) return <Spinner />;
  if (reptiles === null)
    return <ErrorMessage title="Error fetching reptiles" />;
  return (
    <>
      <HeaderTitle title="My Reptiles" secondary>
        <CreateReptile refreshReptileList={fetchReptiles} />
      </HeaderTitle>

      {reptiles.map((reptile) => (
        <div key={reptile.id}>
          <h2>{reptile.name}</h2>
          <p>{reptile.species}</p>
        </div>
      ))}
    </>
  );
};
export default ReptileList;
