import { useState, useContext, useEffect } from "react";
import { Schedule, Reptile, User } from "../api/models";
import { CreateScheduleBody } from "../api/apiTypes";
import { ScheduleType } from "../api/apiTypes";
import { AuthContext } from "../context/AuthContext";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";

type CreateScheduleProps = {
  refreshScheduleList: () => void;
};
const scheduleType: ScheduleType = "feed";

const initialSchedule: CreateScheduleBody = {
  type: scheduleType,
  description: "",
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false,
};

export const CreateSchedule = (props: CreateScheduleProps) => {
  const { refreshScheduleList } = props;
  const [schedule, setSchedule] = useState<CreateScheduleBody>(initialSchedule);
  const [reptileID, setReptileID] = useState("");
  const [reptiles, setReptiles] = useState<Reptile[]>([]);
  const { api } = useContext(AuthContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSchedule((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSchedule((prevState) => ({ ...prevState, [name]: checked }));
  };

  const handleClose = () => {
    setSchedule(initialSchedule);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    api.createSchedule(schedule, parseInt(reptileID)).then(() => {
      refreshScheduleList();
      handleClose();
    });
  };

  const getReptiles = () => {
    api.getReptiles().then((reptiles) => {
      console.log("USer reptiles: ", reptiles);
      setReptiles(reptiles);
    });
  };

  useEffect(() => {
    getReptiles();
  }, []);

  const reptileOptionSelection = () => {
    const reptileOptions = reptiles.map((reptile) => {
      return (
        <MenuItem key={reptile.id} value={reptile.id}>
          {reptile.name}
        </MenuItem>
      );
    });
    return (
      <FormControl>
        <InputLabel>Reptile</InputLabel>
        <Select
          value={reptileID.toString()}
          onChange={(e) => {
            setReptileID(e.target.value as string);
          }}
        >
          {reptileOptions}
        </Select>
      </FormControl>
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <InputLabel>Type</InputLabel>
        <Select
          name="type"
          value={schedule.type}
          onChange={(e) => {
            setSchedule({ ...schedule, type: e.target.value as ScheduleType });
          }}
        >
          <MenuItem value="feed">Feed</MenuItem>
          <MenuItem value="record">Record</MenuItem>
          <MenuItem value="clean">Clean</MenuItem>
        </Select>
      </FormControl>
      {reptileOptionSelection()}

      <TextField
        name="description"
        label="Description"
        value={schedule.description}
        onChange={handleInputChange}
      />
      <FormControlLabel
        control={
          <Checkbox
            name="monday"
            checked={schedule.monday}
            onChange={handleCheckboxChange}
          />
        }
        label="Monday"
      />
      <FormControlLabel
        control={
          <Checkbox
            name="tuesday"
            checked={schedule.tuesday}
            onChange={handleCheckboxChange}
          />
        }
        label="Tuesday"
      />
      <FormControlLabel
        control={
          <Checkbox
            name="wednesday"
            checked={schedule.wednesday}
            onChange={handleCheckboxChange}
          />
        }
        label="Wednesday"
      />
      <FormControlLabel
        control={
          <Checkbox
            name="thursday"
            checked={schedule.thursday}
            onChange={handleCheckboxChange}
          />
        }
        label="Thursday"
      />
      <FormControlLabel
        control={
          <Checkbox
            name="friday"
            checked={schedule.friday}
            onChange={handleCheckboxChange}
          />
        }
        label="Friday"
      />
      <FormControlLabel
        control={
          <Checkbox
            name="saturday"
            checked={schedule.saturday}
            onChange={handleCheckboxChange}
          />
        }
        label="Saturday"
      />
      <FormControlLabel
        control={
          <Checkbox
            name="sunday"
            checked={schedule.sunday}
            onChange={handleCheckboxChange}
          />
        }
        label="Sunday"
      />
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </form>
  );
};
