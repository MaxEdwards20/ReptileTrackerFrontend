import AddIcon from "@mui/icons-material/Add";
import UndoIcon from "@mui/icons-material/Undo";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Container,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Reptile } from "../api/models";
import { ErrorMessage } from "../components/ErrorMessage";
import { HeaderTitle } from "../components/HeaderTitle";
import { Spinner } from "../components/Spinner";
import { AuthContext } from "../context/AuthContext";
import { CreateSchedule } from "../components/CreateSchedules";
export const ReptilePage: FC = () => {
  const navigate = useNavigate();
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
        <>
          <HeaderTitle title={reptile.name}>
            <IconButton onClick={() => setEditingName(true)}>
              <EditIcon />
            </IconButton>
          </HeaderTitle>
          <Button onClick={() => deleteReptile()} color="error">
            Delete Reptile
          </Button>
          <CreateSchedule
            initialReptileId={reptile.id}
            refreshScheduleList={fetchReptile}
          />

          <TextField
            onChange={(e) => editReptile("name", e.target.value)}
            value={editedReptile?.name || reptile.name}
            label="Name"
          />
        </>
      )}
      <HeaderTitle title="Feedings" secondary>
        <IconButton>
          <AddIcon />
        </IconButton>
      </HeaderTitle>
      <Typography>feedings:</Typography>

      <HeaderTitle title="Husbandry Records" secondary>
        <IconButton>
          <AddIcon />
        </IconButton>
      </HeaderTitle>
      <Typography>husbandry records:</Typography>

      <HeaderTitle title="Schedules" secondary>
        <IconButton>
          <AddIcon />
        </IconButton>
      </HeaderTitle>
      <Typography>schedules:</Typography>
    </Container>
  );
};
