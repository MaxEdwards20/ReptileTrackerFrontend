import AddIcon from "@mui/icons-material/Add";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { FC, useContext, useState } from "react";
import { SexType, SpeciesType } from "../api/apiTypes";
import { AuthContext } from "../context/AuthContext";

type CreateReptileProps = {
  refreshReptileList: () => void;
};

export const CreateReptile: FC<CreateReptileProps> = (props) => {
  const { refreshReptileList } = props;
  const { api } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const [species, setSpecies] = useState<SpeciesType | "">("");
  const [name, setName] = useState("");
  const [sex, setSex] = useState<SexType | "">("");

  const handleClose = () => {
    resetForm();
    setOpen(false);
  };

  const resetForm = () => {
    setError("");
    setName("");
    setSex("");
    setSpecies("");
  };

  const handleCreateReptile = () => {
    if (!name || !species || !sex) {
      return setError("Please fill out all fields");
    }
    api.createReptile({ name, species, sex }).then(() => {
      refreshReptileList();
      handleClose();
    });
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => setOpen(true)}
        startIcon={<AddIcon />}
      >
        Add Reptile
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Add Reptile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the following information to add a reptile.
          </DialogContentText>

          <Stack paddingY={4} gap="2rem">
            <TextField
              onChange={(e) => setName(e.target.value)}
              value={name}
              label="Name"
            />
            <Stack direction="row" gap="2rem">
              <FormControl fullWidth>
                <InputLabel>Sex</InputLabel>
                <Select
                  value={sex}
                  label="Sex"
                  onChange={(e) => setSex(e.target.value as SexType)}
                >
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Species</InputLabel>
                <Select
                  value={species}
                  label="Species"
                  onChange={(e) => setSpecies(e.target.value as SpeciesType)}
                >
                  <MenuItem value={"ball_python"}>Ball Python</MenuItem>
                  <MenuItem value={"king_snake"}>King Snake</MenuItem>
                  <MenuItem value={"corn_snake"}>Corn Snake</MenuItem>
                  <MenuItem value={"redtail_boa"}>Redtail Boa</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Stack>
          {error && <Alert severity="error">{error}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateReptile}>
            Add Reptile
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
