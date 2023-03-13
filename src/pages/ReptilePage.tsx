import { Container, IconButton, TextField } from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Reptile } from "../api/models";
import { ErrorMessage } from "../components/ErrorMessage";
import { HeaderTitle } from "../components/HeaderTitle";
import { Spinner } from "../components/Spinner";
import { AuthContext } from "../context/AuthContext";

export const ReptilePage: FC = () => {
  const { id: reptileId } = useParams();
  const { api } = useContext(AuthContext);
  if (!reptileId) return <ErrorMessage title="Error fetching reptile" />;

  const [reptile, setReptile] = useState<Reptile | null>();
  const [editedReptile, setEditedReptile] = useState<Reptile>();

  const fetchReptile = () => {
    setReptile(undefined);
    api
      .getReptile(parseInt(reptileId))
      .then((rep) => {
        setReptile(rep);
        setEditedReptile(rep);
      })
      .catch(() => {
        setReptile(null);
      });
  };

  function editReptile<T extends keyof Reptile>(field: T, value: Reptile[T]) {
    if (!reptile) return;
    setEditedReptile({ ...reptile, [field as keyof Reptile]: value });
  }

  useEffect(() => {
    fetchReptile();
  }, [reptileId]);

  if (reptile === undefined) return <Spinner />;
  if (reptile === null) return <ErrorMessage title="Error fetching reptile" />;

  return (
    <Container maxWidth="md">
      <HeaderTitle title={reptile.name}>
        <IconButton>
          
        </IconButton>
      </HeaderTitle>
    </Container>
  );
};
