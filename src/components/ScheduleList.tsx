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
  const [schedules, setSchedules] = useState<Schedule[] | undefined>();
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

  const checkIfToday = (schedule: Schedule): Boolean => {
    switch (days[today]) {
      case days[0]:
        if (schedule.sunday) {
          return true;
        }
      case days[1]:
        if (schedule.monday) {
          return true;
        }
        break;
      case days[2]:
        if (schedule.tuesday) {
          return true;
        }
        break;
      case days[3]:
        if (schedule.wednesday) {
          return true;
        }
        break;
      case days[4]:
        if (schedule.thursday) {
          return true;
        }
        break;
      case days[5]:
        if (schedule.friday) {
          return true;
        }
        break;
      case days[6]:
        if (schedule.saturday) {
          return true;
        }
    }
    return false;
  };

  const fetchSchedules = () => {
    setSchedules(undefined);
    api.getSchedulesByUser(user.id).then((schedules) => {
      console.log("Schedules for user: ", schedules);
      console.log("Today: ", days[today].toLowerCase());
      if (!schedules) return;
      const todaySchedules = schedules.filter((schedule) => {
        if (checkIfToday(schedule)) {
          return schedule;
        }
      });
      setSchedules(todaySchedules);
    });
  };

  useEffect(() => {
    setToday(new Date().getDay());
    fetchSchedules();
  }, []);

  if (schedules === undefined) return <Spinner />;
  if (schedules === null)
    return <ErrorMessage title="Error fetching reptiles" />;
  if (schedules.length === 0) {
    return <Typography>You have no schedule for {days[today]}</Typography>;
  }
  return (
    <>
      <HeaderTitle
        title={`My Schedules for ${days[today]}`}
        secondary
      ></HeaderTitle>

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
