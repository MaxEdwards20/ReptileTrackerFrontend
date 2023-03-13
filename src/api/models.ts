type DateTime = string;

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  reptiles: Reptile[];
  schedule: Schedule[];
};

export type Reptile = {
  id: number;
  user: User;
  userId: number;
  species: string;
  name: string;
  sex: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  feeding: Feeding[];
  husbandryRecord: HusbandryRecord[];
  schedule: Schedule[];
};
export type Feeding = {
  id: number;
  reptile: Reptile;
  reptileId: number;
  foodItem: string;
  createdAt: DateTime;
  updatedAt: DateTime;
};

export type HusbandryRecord = {
  id: number;
  reptile: Reptile;
  reptileId: number;
  length: number;
  weight: number;
  temperature: number;
  humidity: number;
  createdAt: DateTime;
  updatedAt: DateTime;
};

export type Schedule = {
  id: number;
  reptile: Reptile;
  reptileId: number;
  user: User;
  userId: number;
  type: string;
  description: string;
  monday: Boolean;
  tuesday: Boolean;
  wednesday: Boolean;
  thursday: Boolean;
  friday: Boolean;
  saturday: Boolean;
  sunday: Boolean;
  createdAt?: DateTime;
  updatedAt?: DateTime;
};
