import React, { useState, useEffect, useContext } from "react";
import { Grid, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { Schedule } from "../api/models";
import { ScheduleCard } from "./ScheduleCard";
import { CreateSchedule } from "./CreateSchedules";
import { Spinner } from "./Spinner";
import { ErrorMessage } from "./ErrorMessage";
import { HeaderTitle } from "./HeaderTitle";
import { Container } from "@mui/material";

export const ScehduleList = () => {
  const [schedules, setSchedules] = useState<Schedule[] | null>();
  const { api, user } = useContext(AuthContext);
  const [today, setToday] = useState(new Date().getDay());
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const fetchSchedules = () => {
    setSchedules(undefined);
    api
      .getSchedulesByUser(user.id)
      .then((schedules) => {
        const todaySchedules = schedules.filter((schedule) => {
          schedule[days[today].toLowerCase() as keyof typeof schedule];
        });
        setSchedules(todaySchedules);
      })
      .catch(() => setSchedules(null));
  };

  useEffect(() => {
    setToday(new Date().getDay());
    fetchSchedules();
  }, []);

  if (schedules === undefined) return <Spinner />;
  if (schedules === null)
    return <ErrorMessage title="Error fetching reptiles" />;
  return (
    <>
      <HeaderTitle
        title={`My Schedules for ${days[today]}`}
        secondary
      ></HeaderTitle>
      <Typography variant="h5">Create a schedule</Typography>

      <Grid container paddingTop={4}>
        <CreateSchedule refreshScheduleList={fetchSchedules} />
      </Grid>

      <Grid container spacing={4} paddingTop={10}>
        {schedules.map((schedule) => (
          <Grid item key={schedule.id}>
            <ScheduleCard schedule={schedule} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
