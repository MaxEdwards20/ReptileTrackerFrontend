import { Container, TextField } from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Reptile } from "../api/models";
import { ErrorMessage } from "../components/ErrorMessage";
import { HeaderTitle } from "../components/HeaderTitle";
import { Spinner } from "../components/Spinner";
import { AuthContext } from "../context/AuthContext";
import { CreateSchedule } from "../components/CreateSchedules";
import { Button } from "@mui/material";
export const ReptilePage: FC = () => {
  const navigate = useNavigate();
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

  const deleteReptile = () => {
    if (!reptile) return;
    api.deleteReptile(reptile.id).then(() => {
      navigate("/dashboard");
    });
  };

  useEffect(() => {
    fetchReptile();
  }, [reptileId]);

  if (reptile === undefined) return <Spinner />;
  if (reptile === null) return <ErrorMessage title="Error fetching reptile" />;

  return (
    <>
      <Container maxWidth="md">
        <HeaderTitle title={reptile.name} />
        <Button onClick={() => deleteReptile()} color="error">
          Delete Reptile
        </Button>
        <CreateSchedule
          reptileID={reptile.id}
          refreshScheduleList={fetchReptile}
        />

        <TextField
          onChange={(e) => editReptile("name", e.target.value)}
          value={editedReptile?.name || reptile.name}
          label="Name"
        />
      </Container>
    </>
  );
};
