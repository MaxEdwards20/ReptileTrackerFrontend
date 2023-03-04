import { Container } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReptile } from "../api/apiFunctions";
import { Reptile } from "../api/models";
import { ErrorMessage } from "../components/ErrorMessage";
import { HeaderTitle } from "../components/HeaderTitle";
import { Spinner } from "../components/Spinner";

export const ReptilePage: FC = () => {
  const { id: reptileId } = useParams();
  if (!reptileId) return <ErrorMessage title="Error fetching reptile" />;

  const [reptile, setReptile] = useState<Reptile | null>();

  const fetchReptile = () => {
    setReptile(undefined);
    getReptile(parseInt(reptileId))
      .then(setReptile)
      .catch(() => setReptile(null));
  };

  useEffect(() => {
    fetchReptile();
  }, [reptileId]);

  if (reptile === undefined) return <Spinner />;
  if (reptile === null) return <ErrorMessage title="Error fetching reptile" />;

  return (
    <Container maxWidth="md">
      <HeaderTitle title={reptile.name} />
    </Container>
  );
};
