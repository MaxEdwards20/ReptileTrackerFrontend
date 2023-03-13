import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Schedule } from "../api/models";

interface ScheduleCardProps {
  schedule: Schedule;
}

export const ScheduleCard: FC<ScheduleCardProps> = (
  props: ScheduleCardProps
) => {
  const navigate = useNavigate();
  const { schedule } = props;
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const selectedDays = days.filter(
    (day) => schedule[day as keyof typeof schedule]
  );

  return (
    <Card
      sx={{ minWidth: "12rem", cursor: "pointer" }}
      onClick={() => {
        navigate(`/schedule/${schedule.id}`);
      }}
    >
      <CardContent>
        <Typography color="text.secondary" gutterBottom>
          {schedule.type}
        </Typography>
        <Typography color="textSecondary">
          {selectedDays.length > 0
            ? selectedDays.join(", ")
            : "No days selected"}
        </Typography>
        <Typography variant="body2" component="p">
          {schedule.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ScheduleCard;
