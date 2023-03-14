import { CreateScheduleBody } from "../api/apiTypes";

export const daysList = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export const initialSchedule: CreateScheduleBody = {
  type: "feed",
  description: "",
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false,
};
