import { Button, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { getReptiles } from "../api/apiFunctions";
import { Reptile } from "../api/models";
import { CreateReptile } from "./CreateReptile";
import { ErrorMessage } from "./ErrorMessage";
import { HeaderTitle } from "./HeaderTitle";
import ReptileCard from "./ReptileCard";
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

      <Grid container spacing={4} paddingTop={8}>
        {reptiles.map((reptile) => (
          <Grid item>
            <ReptileCard key={reptile.id} reptile={reptile} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default ReptileList;
