import UndoIcon from "@mui/icons-material/Undo";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import {
  Container,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
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
  const [editingName, setEditingName] = useState(false);

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

  const save = () => {
    if (!editedReptile) return;
    api
      .updateReptile(reptileId, {
        name: editedReptile.name,
        sex: editedReptile.sex,
        species: editedReptile.species,
      })
      .then(() => {
        setReptile(editedReptile);
        setEditingName(false);
      });
  };

  useEffect(() => {
    fetchReptile();
  }, [reptileId]);

  if (reptile === undefined) return <Spinner />;
  if (reptile === null) return <ErrorMessage title="Error fetching reptile" />;

  return (
    <Container maxWidth="md">
      {editingName ? (
        <>
          <HeaderTitle
            displayComponent={
              <Stack direction="row" alignItems="center" gap={2} width="100%">
                <TextField
                  fullWidth
                  label="Name"
                  value={editedReptile?.name}
                  onChange={(e) => editReptile("name", e.target.value)}
                />
                <div>
                  <Tooltip title="Save">
                    <IconButton onClick={save}>
                      <CheckIcon />
                    </IconButton>
                  </Tooltip>
                </div>
                <div>
                  <IconButton onClick={() => setEditingName(false)}>
                    <UndoIcon />
                  </IconButton>
                </div>
              </Stack>
            }
          />
        </>
      ) : (
        <HeaderTitle title={reptile.name}>
          <IconButton onClick={() => setEditingName(true)}>
            <EditIcon />
          </IconButton>
        </HeaderTitle>
      )}
    </Container>
  );
};
